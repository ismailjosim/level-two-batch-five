import { IBook } from './book.interface';
import { Book } from './book.modal';

// post req: create Book into DB
const createBookIntoDB = async (bookData: IBook) => {
  const res = await Book.create(bookData);

  return res;
};
const getAllBooksFromDB = async () => {
  const res = await Book.find();
  return res;
};
export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
};
