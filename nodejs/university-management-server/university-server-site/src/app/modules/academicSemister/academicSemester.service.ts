import { AcademicSemesterCodeNameMapper } from './academicSemester.constant';
import { IAcademicSemesterInterface } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (
  payload: IAcademicSemesterInterface,
) => {
  // check if the semester code match with the predefined semester names ['Autumn' = '01','Summer' = '02','Fall' = '03']
  if (AcademicSemesterCodeNameMapper[payload.name] !== payload.code) {
    throw new Error('Semester Name and Semester Code does not match!');
  }

  const res = await AcademicSemesterModel.create(payload);
  return res;
};

// const getAllUserFromDB = async () => {
//   const res = await User.find();
//   return res;
// };

// const getSingleUserFromDB = async (id: string) => {
//   const res = await User.findById(id);
//   return res;
// };

// const deleteSingleUserFromDB = async (id: string) => {
//   const getUser = await getSingleUserFromDB(id);
//   if (getUser) {
//     if (getUser.isDeleted === false) {
//       const res = await User.updateOne({ _id: id }, { isDeleted: true });
//       return res;
//     } else {
//       throw new Error('User is Already Deleted!');
//     }
//   } else {
//     throw new Error('User Not Found!');
//   }
// };

// export user
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
