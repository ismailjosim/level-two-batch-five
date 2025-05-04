import { SemesterRegistrationStatus } from './semesterRegistration.const';
import { TSemesterRegistrationInterface } from './semesterRegistration.interface';
import mongoose, { Schema } from 'mongoose';

const semesterRegistrationSchema =
  new mongoose.Schema<TSemesterRegistrationInterface>(
    {
      academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'academicSemester',
        required: true,
        unique: true,
      },
      status: {
        type: String,
        enum: SemesterRegistrationStatus,
        default: 'UPCOMING',
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      minCredit: {
        type: Number,
        default: 3,
      },
      maxCredit: {
        type: Number,
        default: 15,
      },
    },
    { timestamps: true },
  );

export const SemesterRegistrationModel =
  mongoose.model<TSemesterRegistrationInterface>(
    'SemesterRegistration',
    semesterRegistrationSchema,
  );
