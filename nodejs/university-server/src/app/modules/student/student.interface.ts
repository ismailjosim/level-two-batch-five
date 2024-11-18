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