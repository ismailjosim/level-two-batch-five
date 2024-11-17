// student interface => schema => Model => DB Query

import { model, Schema } from 'mongoose';

// step 01: create interface
export interface Student {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: 'male' | 'female';
  age: number;
  major: string;
  gpa: number;
  contact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fatherName: string;
    motherName: string;
    contact: string;
    occupation: string;
  };
  profileImage?: string;
  isActive: 'active' | 'inActive';
}

// step 03: create model
// const studentModel = model<Student>('Student', studentSchema);

// step 04: create query
// const student = new studentModel({
//   name: { firstName: 'John', lastName: 'Doe' },
//   dateOfBirth: '1995-02-15',
//   gender: 'male',
//   age: 25,
//   major: 'Computer Science',
//   gpa: 3.7,
//   contact: '1234567890',
//   bloodGroup: 'A+',
//   presentAddress: '123 Main St',
//   permanentAddress: '456 Elm St',
//   guardian: {
//     fatherName: 'Jane Doe',
//     motherName: 'Mary Doe',
//     contact: '9876543210',
//     occupation: 'Engineer',
//   },
// });
