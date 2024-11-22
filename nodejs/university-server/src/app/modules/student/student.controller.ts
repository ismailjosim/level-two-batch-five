import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { ZodStudentValidationSchema } from './student.validation';

// Post: Single student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    //* validate data using JOI validation
    // const { error, value } = StudentValidationSchema.validate(student);
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Validation failed',
    //     errors: error.details.map((err) => err.message),
    //   });
    // }

    // Create a Schema validation using ZOD
    const zodParseData = ZodStudentValidationSchema.parse(student);

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'There was an error creating the student',
      error,
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'There was an error creating the student',
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
