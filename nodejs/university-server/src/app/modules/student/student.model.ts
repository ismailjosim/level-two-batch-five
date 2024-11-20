import { model, Schema } from 'mongoose';
import { Student } from './student.interface';

// step 02: create schema
const studentSchema = new Schema<Student>({
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

// step 03: create model
export const StudentModel = model<Student>('Student', studentSchema);
