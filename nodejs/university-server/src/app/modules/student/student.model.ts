import { model, Schema } from 'mongoose';
import { StudentModel, TStudent } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

// step 02: create schema
const studentSchema = new Schema<TStudent, StudentModel>({
  name: {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
      validate: {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameStr === value;
        },
        message: '{VALUE} is not in capitalize format.',
      },
    },
    middleName: { type: String, trim: true },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid.',
      },
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: function (value: string) {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message:
        'Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters.',
    },
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required.'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Gender must be either "male", "female", or "others".',
    },
    required: [true, 'Gender is required.'],
    trim: true,
  },
  age: { type: Number, required: [true, 'Age is required.'] },
  major: { type: String, required: [true, 'Major is required.'], trim: true },
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be less than 0.'],
    max: [4, 'GPA cannot be more than 4.'],
    required: [true, 'GPA is required.'],
  },
  contact: {
    type: String,
    required: [true, 'Contact number is required.'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Invalid blood group.',
    },
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
    trim: true,
  },
  guardian: {
    fatherName: {
      type: String,
      required: [true, "Father's name is required."],
      trim: true,
    },
    motherName: {
      type: String,
      required: [true, "Mother's name is required."],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Guardian's contact number is required."],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, "Guardian's occupation is required."],
      trim: true,
    },
  },
  profileImage: {
    type: String,
    required: [true, 'Profile image URL is required.'],
    trim: true,
  },
  isActive: {
    type: String,
    required: [true, 'Status is required.'],
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either "active" or "blocked".',
    },
    default: 'active',
    trim: true,
  },
});

//* custom instance methods
// studentSchema.methods.isUserExists = async function (
//   email: string,
// ): Promise<TStudent | null> {
//   const existUser = await Student.findOne({ email });
//   return existUser;
// };

// * create a custom static method
studentSchema.statics.isUserExists = async function (
  email: string,
): Promise<TStudent | null> {
  const existUser = await Student.findOne({ email });
  return existUser;
};

//  pre save middleware/hooks
studentSchema.pre('save', async function (next) {
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // this refers to the DOC
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post hook/middleware
studentSchema.post('save', function () {
  console.log(this, 'from post hook: saved data');
});

// step 03: create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
