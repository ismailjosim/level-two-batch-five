import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const user: NewUser = {};
  // * if user did't provide a password, use default password
  user.password = password || (config.default_password as string);

  // * set student role
  user.role = 'student';

  //* manually generate a ID for the student
  user.id = '20230100001';

  //* create a new user
  const res = await User.create(user);

  //* create a new student: here id will be embedded
  if (Object.keys(res).length) {
    // set id, _id as user
    studentData.id = res.id;
    studentData.user = res._id;

    // create a new student in database
    const studentRes = await Student.create(studentData);

    return studentRes;
  }

  //* save method in mongoose
  return res;
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
