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

const getAllAcademicSemesterFromDB = async () => {
  const res = await AcademicSemesterModel.find();
  return res;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const res = await AcademicSemesterModel.findById(id);
  return res;
};

const deleteSingleAcademicSemesterFromDB = async (id: string) => {
  const getAcademicSemester = await getSingleAcademicSemesterFromDB(id);
  if (getAcademicSemester) {
    const res = await AcademicSemesterModel.deleteOne({ _id: id });
    return res;
  } else {
    throw new Error('Semester Not Found!');
  }
};

const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<IAcademicSemesterInterface>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterCodeNameMapper[payload.name] !== payload.code
  ) {
    throw new Error('Semester Name and Semester Code does not match!');
  }
  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

// export user
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  deleteSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
