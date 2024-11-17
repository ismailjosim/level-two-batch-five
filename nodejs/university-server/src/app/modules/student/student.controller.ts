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

export const StudentControllers = {
  createStudent,
};
