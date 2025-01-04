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

academicSemesterSchema.pre('save', async function (next) {
  // check if semester already exist in DB
  const query = {
    year: this.year,
    name: this.name,
  };
  const isSemesterExist = await AcademicSemesterModel.findOne(query);

  if (isSemesterExist) {
    throw new Error(
      `${this.name} semester is already exists for year ${this.year}`,
    );
  }
  next();
});

export const AcademicSemesterModel = model<IAcademicSemesterInterface>(
  'academicSemester',
  academicSemesterSchema,
);
