import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

// Post: Single student
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;
    // Create a Schema validation using ZOD
    // const zodParseData = ZodStudentValidationSchema.parse(student);

    const result = await UserServices.createStudentIntoDB(password, student);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(201).json({
      success: true,
      message: 'All Users Data Fetched Successfully!',
      total: result.length,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(201).json({
      success: true,
      message: 'Found User with id ' + id,
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};
const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteSingleUserFromDB(id);
    res.status(201).json({
      success: true,
      message: 'User is Deleted successfully. ID: ' + id,
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};

// export user controllers
export const UserControllers = {
  createStudent,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
};
