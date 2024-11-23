import { Model } from 'mongoose';

// step 01: create interface
export interface TStudent {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  password: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'others';
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
  isActive: 'active' | 'blocked';
}

//* Create static
export interface StudentModel extends Model<TStudent> {
  isUserExists(): Promise<TStudent | null>;
}

// custom instance methods
// export interface StudentMethod {
//   isUserExists(email: string): Promise<TStudent | null>;
// }
// export type StudentModel = Model<TStudent, Record<string, never>>;
