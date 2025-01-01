import { model, Schema } from 'mongoose';
import { IAcademicFacultyInterface } from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFacultyInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFacultyModel = model<IAcademicFacultyInterface>(
  'academicFaculty',
  academicFacultySchema,
);
