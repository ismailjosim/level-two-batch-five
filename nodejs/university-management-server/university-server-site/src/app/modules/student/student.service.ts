import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //* static method in mongoose
  const existUser = await Student.findOne({ email: studentData.email });
  if (existUser) {
    throw new Error('User with this email already exists from static method');
  }

  const res = await Student.create(studentData); //* mongoose built in static method

  //* Call the isUserExists method on the instance
  // const studentInstance = new Student(student); //* create a new instance
  // const userExists = await studentInstance.isUserExists(student.email);
  // if (userExists) {
  //   throw new Error('User with this email already exists from custom method');
  // }
  // const res = await studentInstance.save(); //* mongoose built in instance method

  //* save method in mongoose
  return res;
};
const getAllStudentFromDB = async () => {
  const res = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return res;
};
const getSingleStudentFromDB = async (id: string) => {
  const res = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // method 2: using aggregate
  // const res = await Student.aggregate([
  //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
  // ]);

  return res;
};

// delete a single student from the database
const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudentRes = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudentRes) {
      throw new AppError(404, 'Failed To delete student');
    }

    // second transaction
    const deleteUserRes = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUserRes) {
      throw new AppError(404, 'Failed To delete User');
    }

    //* Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return deleteStudentRes;
  } catch (error) {
    // Rollback the transaction in case of any error
    await session.abortTransaction();
    session.endSession();
    if (error) {
      throw new Error('Something went wrong!');
    }
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
