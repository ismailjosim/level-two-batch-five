import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentID } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // * create a user object
  const userData: Partial<IUser> = {};

  // * if user did't provide a password, use default password
  userData.password = password || (config.default_password as string);

  // * set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const session = await mongoose.startSession();
  // start session
  session.startTransaction();

  try {
    // * Auto Generate ID for student: year, semesterCode, 4 digit number
    userData.id = await generateStudentID(admissionSemester);
    userData.email = payload.email;

    //* create a new user => Transaction-01
    const newUser = await User.create([userData], { session });

    //* create a new student: here id will be embedded
    if (!newUser.length) {
      throw new AppError(404, 'Failed to create User');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // it's a reference id of the new user

    //* create a new student in database => Transaction-02
    const studentRes = await Student.create([payload], { session });
    if (!studentRes.length) {
      throw new AppError(404, 'Failed to create Student');
    }

    //* Commit the transaction
    await session.commitTransaction();
    session.endSession();

    //* save method in mongoose
    return studentRes;
  } catch (error: any) {
    // Rollback the transaction in case of any error
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const getAllUserFromDB = async () => {
  const res = await User.find();
  return res;
};

const getSingleUserFromDB = async (id: string) => {
  const res = await User.findById(id);
  return res;
};

const deleteSingleUserFromDB = async (id: string) => {
  const getUser = await getSingleUserFromDB(id);
  if (getUser) {
    if (getUser.isDeleted === false) {
      const res = await User.updateOne({ _id: id }, { isDeleted: true });
      return res;
    } else {
      throw new Error('User is Already Deleted!');
    }
  } else {
    throw new Error('User Not Found!');
  }
};

// export user
export const UserServices = {
  createStudentIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
};
