import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

//* Post Request: create student
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  // Create a Schema validation using ZOD
  // const zodParseData = ZodStudentValidationSchema.parse(student);

  const result = await UserServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

// Get Request: Get All Users
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Users Data Fetched Successfully!',
    data: result,
  });
});

// Get Request: Get Single User by ID
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Found User with id ' + id,
    data: result,
  });
});

// Delete Request: Delete Single User by ID
const deleteSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is Deleted successfully. ID: ' + id,
    data: result,
  });
});

// export user controllers
export const UserControllers = {
  createStudent,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
};
