import { IAcademicDepartmentInterface } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  payload: IAcademicDepartmentInterface,
) => {
  const res = await AcademicDepartmentModel.create(payload);
  return res;
};

const getAllAcademicDepartmentFromDB = async () => {
  const res = await AcademicDepartmentModel.find().populate('academicFaculty');
  return res;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const res =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty');
  return res;
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<IAcademicDepartmentInterface>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

// export user
export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
