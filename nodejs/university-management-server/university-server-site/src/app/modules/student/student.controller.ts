import { Request, Response } from 'express';
import { StudentServices } from './student.service';

// Get All Students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(201).json({
      success: true,
      message: 'All students fetched successfully',
      total: result.length,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There was an error creating the student',
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
// Get single Student with ID
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(201).json({
      success: true,
      message: 'Found student with id ' + id,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There was an error creating the student',
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
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(id);
    res.status(201).json({
      success: true,
      message: 'student is Deleted successfully. ID: ' + id,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There was an error creating the student',
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

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
