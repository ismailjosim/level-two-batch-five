import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (useData: IUser) => {
  const res = await User.create(useData);
  return res;
};

// export user
export const UserServices = {
  createUserIntoDB,
};
