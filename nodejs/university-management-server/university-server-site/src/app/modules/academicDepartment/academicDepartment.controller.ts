import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

//* Post Request: create student
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

// Get Request: Get All Users
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Academic Department Data Fetched Successfully!',
    data: result,
  });
});

// Get Request: Get Single User by ID
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Found Department with id ' + id,
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      departmentId,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department Updated successfully',
    data: result,
  });
});

// export user controllers
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
