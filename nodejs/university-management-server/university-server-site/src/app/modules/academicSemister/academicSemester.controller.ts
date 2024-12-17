import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

//* Post Request: create student
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

// Get Request: Get All Users
// const getAllAcademicSemester = catchAsync(async (req, res) => {
//   //   const result = await UserServices.getAllUserFromDB();
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'All Users Data Fetched Successfully!',
//     data: result,
//   });
// });

// Get Request: Get Single User by ID
// const getSingleAcademicSemester = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   //   const result = await UserServices.getSingleUserFromDB(id);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Found User with id ' + id,
//     data: result,
//   });
// });

// Delete Request: Delete Single User by ID
// const deleteSingleAcademicSemester = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   //   const result = await UserServices.deleteSingleUserFromDB(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User is Deleted successfully. ID: ' + id,
//     data: result,
//   });
// });

// export user controllers
export const AcademicSemesterControllers = {
  createAcademicSemester,
  //   getAllAcademicSemester,
  //   getSingleAcademicSemester,
  //   deleteSingleAcademicSemester,
};
