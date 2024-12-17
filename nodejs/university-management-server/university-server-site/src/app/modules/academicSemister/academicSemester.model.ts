import { model, Schema } from 'mongoose';
import { IAcademicSemesterInterface } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<IAcademicSemesterInterface>(
  {
    name: { type: String, required: true, enum: AcademicSemesterNames },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    year: { type: String, required: true },
    startMonth: { type: String, enum: AcademicSemesterMonths, required: true },
    endMonth: { type: String, enum: AcademicSemesterMonths, required: true },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemesterModel = model<IAcademicSemesterInterface>(
  'academicSemester',
  academicSemesterSchema,
);
