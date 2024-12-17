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
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Academic Semester Data Fetched Successfully!',
    data: result,
  });
});

// Get Request: Get Single User by ID
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Found Semester with id ' + id,
    data: result,
  });
});

// Delete Request: Delete Single User by ID
const deleteSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicSemesterServices.deleteSingleAcademicSemesterFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester is Deleted successfully. ID: ' + id,
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    semesterId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  });
});

// export user controllers
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  deleteSingleAcademicSemester,
  updateAcademicSemester,
};
