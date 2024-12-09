import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (useData: IUser) => {
  const res = await User.create(useData);
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
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
};
