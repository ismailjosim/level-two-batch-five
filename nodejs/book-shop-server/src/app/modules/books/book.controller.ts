import { Request, Response } from 'express';
import { BookServices } from './book.service';

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const result = await BookServices.createBookIntoDB(book);

    // send response
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred While Posting Book',
      error,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooksFromDB();
    res.status(201).json({
      success: true,
      message: 'All books fetched successfully',
      total: result.length,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
        error,
      });
    }
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
};
