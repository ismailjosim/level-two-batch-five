import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  // const res = await StudentModel.create(student); //* mongoose built in static method
  const studentInstance = new StudentModel(student);
  const res = await studentInstance.save(); //* mongoose built in instance method

  return res;
};
const getAllStudentFromDB = async () => {
  const res = await StudentModel.find();
  return res;
};
const getSingleStudentFromDB = async (id: string) => {
  const res = await StudentModel.findById(id);
  return res;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
