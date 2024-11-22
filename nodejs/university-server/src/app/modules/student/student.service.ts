import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  // const res = await StudentModel.create(student); //* mongoose built in static method
  const studentInstance = new Student(student); //* create a new instance

  // Call the isUserExists method on the instance
  const userExists = await studentInstance.isUserExists(student.email);

  if (userExists) {
    throw new Error('User with this email already exists from custom method');
  }

  const res = await studentInstance.save(); //* mongoose built in instance method
  return res;
};
const getAllStudentFromDB = async () => {
  const res = await Student.find();
  return res;
};
const getSingleStudentFromDB = async (id: string) => {
  const res = await Student.findById(id);
  return res;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
