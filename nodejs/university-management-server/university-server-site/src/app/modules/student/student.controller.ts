import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// Get Request: Get All Students
const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All students fetched successfully',
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};
// Get Request: single Student with ID
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Found student with id ' + id,
    data: result,
  });
});
const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student is Deleted successfully. ID: ' + id,
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
