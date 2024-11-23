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
  // method 2: using aggregate
  // const res = await Student.aggregate([
  //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
  // ]);

  return res;
};

// delete a single student from the database
const deleteSingleStudentFromDB = async (id: string) => {
  const getStudent = await getSingleStudentFromDB(id);
  console.log(getStudent);
  if (getStudent) {
    if (getStudent.isDeleted === false) {
      const res = await Student.updateOne({ _id: id }, { isDeleted: true });
      return res;
    } else {
      throw new Error('Student is already deleted');
    }
  } else {
    throw new Error('Student not found');
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
