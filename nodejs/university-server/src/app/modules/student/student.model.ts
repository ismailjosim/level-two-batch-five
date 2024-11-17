import { Schema } from 'mongoose';
import { Student } from './student.interface';

// step 02: create schema
const studentSchema = new Schema<Student>({
  _id: { type: String },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  gpa: { type: Number, min: 0, max: 4, required: true },
  contact: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    contact: { type: String, required: true },
    occupation: { type: String, required: true },
  },
  profileImage: { type: String, required: true },
  isActive: { type: String, required: true },
});
