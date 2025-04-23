/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentID } from './user.utils';
import AppError from '../../errors/AppError';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.modal';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';

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

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDB = async (password: string, payload: TStudent) => {
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
// export user
export const UserServices = {
  createStudentIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
