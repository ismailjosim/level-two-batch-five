import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { RegistrationStatus } from './semesterRegistration.const';
import { TSemesterRegistrationInterface } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistrationInterface,
) => {
  /*
   * Step-01: check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
   * Step-02: check if the semester is already exists.
   * step-03: check if the semester is already registered.
   * step-04: create the semester registration
   */

  const academicSemester = payload?.academicSemester;

  //* Step-01: check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingSemester = await SemesterRegistrationModel.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });

  if (isThereAnyUpcomingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingSemester.status} registered semester`,
    );
  }
  // * Step-02: check if the semester is already exists.
  const isSemesterAlreadyExists =
    await AcademicSemesterModel.findById(academicSemester);
  if (!isSemesterAlreadyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic semester is not found',
    );
  }
  // * Step-03: check if the semester is already registered.
  const isSemesterAlreadyRegistered = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Academic semester is already registered',
    );
  }

  // * Step-04: create the semester registration
  const result = await SemesterRegistrationModel.create(payload);
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create semester registration',
    );
  }
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};
const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistrationInterface>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};
// const deleteSemesterRegistrationFromDB = async (id: string) => {
//   /**
//     * Step1: Delete associated offered courses.
//     * Step2: Delete semester registration when the status is
//     'UPCOMING'.
//     **/

//   // checking if the semester registration is exist
//   const isSemesterRegistrationExists =
//     await SemesterRegistrationModel.findById(id);

//   if (!isSemesterRegistrationExists) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'This registered semester is not found !',
//     );
//   }

//   // checking if the status is still "UPCOMING"
//   const semesterRegistrationStatus = isSemesterRegistrationExists.status;

//   if (semesterRegistrationStatus !== 'UPCOMING') {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `You can not update as the registered semester is ${semesterRegistrationStatus}`,
//     );
//   }

//   const session = await mongoose.startSession();

//   //deleting associated offered courses

//   try {
//     session.startTransaction();

//     const deletedOfferedCourse = await OfferedCourse.deleteMany(
//       {
//         semesterRegistration: id,
//       },
//       {
//         session,
//       },
//     );

//     if (!deletedOfferedCourse) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'Failed to delete semester registration !',
//       );
//     }

//     const deletedSemesterRegistration =
//       await SemesterRegistrationModel.findByIdAndDelete(id, {
//         session,
//         new: true,
//       });

//     if (!deletedSemesterRegistration) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'Failed to delete semester registration !',
//       );
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return null;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  //   deleteSemesterRegistrationFromDB,
};
