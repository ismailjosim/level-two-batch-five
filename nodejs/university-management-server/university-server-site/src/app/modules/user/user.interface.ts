export interface IUser {
  id: string;
  password: string;
  needPasswordChange?: boolean;
  role: 'admin' | 'student' | 'faculty';
  dateOfBirth: Date;
  email: string;
  status: 'in-progress' | 'blocked';
  isDeleted?: boolean;
}
