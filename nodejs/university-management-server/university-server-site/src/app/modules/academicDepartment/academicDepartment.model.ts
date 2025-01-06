import { model, Schema } from 'mongoose';
import { IAcademicDepartmentInterface } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

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

// error handling

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isExist) {
    throw new AppError(404, 'This Department is already exists');
  }
  next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExist = await AcademicDepartmentModel.findOne(query);
  if (!isExist) {
    throw new AppError(404, 'This Department is not exists');
  }
  next();
});

export const AcademicDepartmentModel = model<IAcademicDepartmentInterface>(
  'academicDepartment',
  academicDepartmentSchema,
);
