import { TStudent } from './student.interface';
import { Student } from './student.model';

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
