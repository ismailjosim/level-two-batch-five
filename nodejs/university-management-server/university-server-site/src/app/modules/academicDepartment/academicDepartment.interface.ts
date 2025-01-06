import { Types } from 'mongoose';

export interface IAcademicDepartmentInterface {
  name: string;
  academicFaculty: Types.ObjectId;
}
