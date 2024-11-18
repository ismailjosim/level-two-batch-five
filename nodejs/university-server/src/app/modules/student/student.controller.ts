import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    // will call service function to sent this data
    const result = await StudentServices.createStudentIntoDB(student);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'There was an error creating the student',
      data: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(201).json({
      success: true,
      message: 'All students fetched successfully',
      total: result.length,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'There was an error creating the student',
      data: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(201).json({
      success: true,
      message: 'Found student with id ' + id,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'There was an error creating the student',
      data: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
