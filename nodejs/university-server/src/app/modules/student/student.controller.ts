import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import Joi from 'joi';

// Post: Single student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    // const JoyValidationSchema = Joi.object({
    //   _id: Joi.string().optional(), // Optional field
    //   name: Joi.object({
    //     firstName: Joi.string()
    //       .min(3)
    //       .max(20)
    //       .required()
    //       .regex(/^[A-Z][a-zA-Z]*$/)
    //       .messages({
    //         'string.pattern.base':
    //           'First name must start with an uppercase letter and contain only alphabetic characters.',
    //         'string.empty': 'First name is required.',
    //         'string.min': 'First name must be at least 3 characters long.',
    //         'string.max':
    //           'First name must be less than or equal to 20 characters.',
    //       }),
    //     middleName: Joi.string().optional(), // Optional field
    //     lastName: Joi.string()
    //       .required()
    //       .regex(/^[a-zA-Z]+$/)
    //       .messages({
    //         'string.pattern.base':
    //           'Last name must contain only alphabetic characters.',
    //         'string.empty': 'Last name is required.',
    //       }),
    //   }).required(),
    //   email: Joi.string().email().required().messages({
    //     'string.email': 'Email must be a valid email address.',
    //     'string.empty': 'Email is required.',
    //   }),
    //   dateOfBirth: Joi.string().required().messages({
    //     'string.empty': 'Date of birth is required.',
    //   }),
    //   gender: Joi.string()
    //     .valid('male', 'female', 'others')
    //     .required()
    //     .messages({
    //       'any.only': 'Gender must be either "male", "female", or "others".',
    //       'string.empty': 'Gender is required.',
    //     }),
    //   age: Joi.number().integer().required().messages({
    //     'number.base': 'Age must be a number.',
    //     'any.required': 'Age is required.',
    //   }),
    //   major: Joi.string().required().messages({
    //     'string.empty': 'Major is required.',
    //   }),
    //   gpa: Joi.number().min(0).max(4).required().messages({
    //     'number.min': 'GPA cannot be less than 0.',
    //     'number.max': 'GPA cannot be more than 4.',
    //     'any.required': 'GPA is required.',
    //   }),
    //   contact: Joi.string().required().messages({
    //     'string.empty': 'Contact number is required.',
    //   }),
    //   bloodGroup: Joi.string()
    //     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    //     .optional()
    //     .messages({
    //       'any.only': 'Invalid blood group.',
    //     }),
    //   presentAddress: Joi.string().required().messages({
    //     'string.empty': 'Present address is required.',
    //   }),
    //   permanentAddress: Joi.string().required().messages({
    //     'string.empty': 'Permanent address is required.',
    //   }),
    //   guardian: Joi.object({
    //     fatherName: Joi.string().required().messages({
    //       'string.empty': "Father's name is required.",
    //     }),
    //     motherName: Joi.string().required().messages({
    //       'string.empty': "Mother's name is required.",
    //     }),
    //     contact: Joi.string().required().messages({
    //       'string.empty': "Guardian's contact number is required.",
    //     }),
    //     occupation: Joi.string().required().messages({
    //       'string.empty': "Guardian's occupation is required.",
    //     }),
    //   }).required(),
    //   profileImage: Joi.string().uri().required().messages({
    //     'string.empty': 'Profile image URL is required.',
    //     'string.uri': 'Profile image must be a valid URL.',
    //   }),
    //   isActive: Joi.string().valid('active', 'blocked').required().messages({
    //     'any.only': 'Status must be either "active" or "blocked".',
    //     'string.empty': 'Status is required.',
    //   }),
    // });

    // will call service function to sent this data
    const result = await StudentServices.createStudentIntoDB(student);

    // send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
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
