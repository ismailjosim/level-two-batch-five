import { model, Schema } from 'mongoose';
import { StudentModel, TStudent } from './student.interface';
import validator from 'validator';

// step 02: create schema
const studentSchema = new Schema<TStudent, StudentModel>({
  email: { type: String, required: [true, 'Email is Required'] },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: [true, 'User is Required'],
  },

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
  contactNo: {
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
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// * create a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//  pre save middleware/hooks

// step 03: create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
