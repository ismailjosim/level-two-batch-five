import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // {email: { $regex: new RegExp(query.email as string, $options: 'i') }}
  // {'name.firstName': { $regex: new RegExp(query.email as string, $options: 'i') }}
  // {presentAddress: { $regex: new RegExp(query.email as string, $options: 'i') }}

  // ekhane amra sob gula hard codded likhte parbo na karon ekhane field different different hote pare. ei jonno etake dynamic korte hobe.
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  const searchFields = [
    'email',
    'name.firstName',
    'name.lastName',
    'presentAddress',
  ];

  const searchQuery = Student.find({
    $or: searchFields.map((key) => ({
      [key]: { $regex: new RegExp(searchTerm, 'i') },
    })),
  });

  const res = await searchQuery
    .find()
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
  const res = await Student.findOne({ id })
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
    const isStudentExist = await Student.isUserExists();

    if (!isStudentExist) {
      throw new AppError(404, 'Student not found');
    }

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
      throw new AppError(500, 'Failed to delete student');
    }
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateStudentIntoDB,
};
