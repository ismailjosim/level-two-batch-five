import { Model, Types } from 'mongoose';

export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IGuardian {
  fatherName: string;
  motherName: string;
  contact: string;
  occupation: string;
}

// step 01: create interface
export interface TStudent {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  password: string;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
}

export interface StudentModel extends Model<TStudent> {
  isUserExists(): Promise<TStudent | null>;
}
