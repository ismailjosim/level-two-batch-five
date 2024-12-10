import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

// Get All Students
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(201).json({
      success: true,
      message: 'All students fetched successfully',
      total: result.length,
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};
// Get single Student with ID
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(201).json({
      success: true,
      message: 'Found student with id ' + id,
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(id);
    res.status(201).json({
      success: true,
      message: 'student is Deleted successfully. ID: ' + id,
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
