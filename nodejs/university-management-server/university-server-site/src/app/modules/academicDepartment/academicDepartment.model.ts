import { model, Schema } from 'mongoose';
import { IAcademicDepartmentInterface } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartmentInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartmentModel = model<IAcademicDepartmentInterface>(
  'academicDepartment',
  academicDepartmentSchema,
);
