import { IAcademicDepartmentInterface } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  payload: IAcademicDepartmentInterface,
) => {
  const res = await AcademicDepartmentModel.create(payload);
  return res;
};

const getAllAcademicDepartmentFromDB = async () => {
  const res = await AcademicDepartmentModel.find();
  return res;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const res = await AcademicDepartmentModel.findById(id);
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
