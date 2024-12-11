import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // * create a user object
  const userData: Partial<IUser> = {};

  // * if user did't provide a password, use default password
  userData.password = password || (config.default_password as string);

  // * set student role
  userData.role = 'student';

  //* manually generate a ID for the student
  userData.id = '2030100001';

  //* create a new user
  const newUser = await User.create(userData);

  //* create a new student: here id will be embedded
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // it's a reference id of the new user

    // create a new student in database
    const studentRes = await Student.create(studentData);

    return studentRes;
  }
};

const getAllUserFromDB = async () => {
  const res = await User.find();
  return res;
};

const getSingleUserFromDB = async (id: string) => {
  const res = await User.findById(id);
  return res;
};

const deleteSingleUserFromDB = async (id: string) => {
  const getUser = await getSingleUserFromDB(id);
  if (getUser) {
    if (getUser.isDeleted === false) {
      const res = await User.updateOne({ _id: id }, { isDeleted: true });
      return res;
    } else {
      throw new Error('User is Already Deleted!');
    }
  } else {
    throw new Error('User Not Found!');
  }
};

// export user
export const UserServices = {
  createStudentIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
};
