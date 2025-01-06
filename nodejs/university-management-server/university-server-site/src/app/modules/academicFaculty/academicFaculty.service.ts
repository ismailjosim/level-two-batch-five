import { IAcademicFacultyInterface } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (
  payload: IAcademicFacultyInterface,
) => {
  const res = await AcademicFacultyModel.create(payload);
  return res;
};

const getAllAcademicFacultyFromDB = async () => {
  const res = await AcademicFacultyModel.find();
  return res;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const res = await AcademicFacultyModel.findById(id);
  return res;
};

const updateAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<IAcademicFacultyInterface>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

// export user
export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};
