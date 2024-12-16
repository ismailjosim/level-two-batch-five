import { model, Schema } from 'mongoose';
import {
  IAcademicSemesterInterface,
  Months,
  TSemesterNames,
  TSemesterCode,
} from './academicSemester.interface';

const months: Months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const names: TSemesterNames[] = ['Autumn', 'Summer', 'Fall'];
const semesterCode: TSemesterCode[] = ['01', '02', '03'];

const academicSemesterSchema = new Schema<IAcademicSemesterInterface>(
  {
    name: { type: String, required: true, enum: names },
    code: { type: String, required: true, enum: semesterCode },
    year: { type: Date, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<IAcademicSemesterInterface>(
  'academicSemester',
  academicSemesterSchema,
);
