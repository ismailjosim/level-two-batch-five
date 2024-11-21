import Joi from 'joi';
import { z } from 'zod';
export const JoyStudentValidationSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[A-Z][a-zA-Z]*$/)
      .messages({
        'string.pattern.base':
          'First name must start with an uppercase letter and contain only alphabetic characters.',
        'string.empty': 'First name is required.',
        'string.min': 'First name must be at least 3 characters long.',
        'string.max': 'First name must be less than or equal to 20 characters.',
      }),
    middleName: Joi.string().optional(), // Optional field
    lastName: Joi.string()
      .required()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base':
          'Last name must contain only alphabetic characters.',
        'string.empty': 'Last name is required.',
      }),
  }).required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email is required.',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of birth is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.only': 'Gender must be either "male", "female", or "others".',
    'string.empty': 'Gender is required.',
  }),
  age: Joi.number().integer().required().messages({
    'number.base': 'Age must be a number.',
    'any.required': 'Age is required.',
  }),
  major: Joi.string().required().messages({
    'string.empty': 'Major is required.',
  }),
  gpa: Joi.number().min(0).max(4).required().messages({
    'number.min': 'GPA cannot be less than 0.',
    'number.max': 'GPA cannot be more than 4.',
    'any.required': 'GPA is required.',
  }),
  contact: Joi.string().required().messages({
    'string.empty': 'Contact number is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': 'Invalid blood group.',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required.',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required.',
  }),
  guardian: Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': "Father's name is required.",
    }),
    motherName: Joi.string().required().messages({
      'string.empty': "Mother's name is required.",
    }),
    contact: Joi.string().required().messages({
      'string.empty': "Guardian's contact number is required.",
    }),
    occupation: Joi.string().required().messages({
      'string.empty': "Guardian's occupation is required.",
    }),
  }).required(),
  profileImage: Joi.string().uri().required().messages({
    'string.empty': 'Profile image URL is required.',
    'string.uri': 'Profile image must be a valid URL.',
  }),
  isActive: Joi.string().valid('active', 'blocked').required().messages({
    'any.only': 'Status must be either "active" or "blocked".',
    'string.empty': 'Status is required.',
  }),
});

export const ZodStudentValidationSchema = z.object({
  name: z.object({
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 characters long.')
      .max(20, 'First name must be less than or equal to 20 characters.')
      .regex(
        /^[A-Z][a-zA-Z]*$/,
        'First name must start with an uppercase letter and contain only alphabetic characters.',
      ),
    middleName: z.string().optional(), // Optional field
    lastName: z
      .string()
      .regex(
        /^[a-zA-Z]+$/,
        'Last name must contain only alphabetic characters.',
      )
      .nonempty('Last name is required.'),
  }),
  email: z
    .string()
    .email('Email must be a valid email address.')
    .nonempty('Email is required.'),
  dateOfBirth: z.string().nonempty('Date of birth is required.'),
  gender: z.enum(['male', 'female', 'others'], {
    errorMap: () => ({
      message: 'Gender must be either "male", "female", or "others".',
    }),
  }),
  age: z
    .number({
      required_error: 'Age is required.',
      invalid_type_error: 'Age must be a number.',
    })
    .int('Age must be an integer.')
    .nonnegative('Age must be a non-negative number.'),
  major: z.string().nonempty('Major is required.'),
  gpa: z
    .number({
      required_error: 'GPA is required.',
      invalid_type_error: 'GPA must be a number.',
    })
    .min(0, 'GPA cannot be less than 0.')
    .max(4, 'GPA cannot be more than 4.'),
  contact: z.string().nonempty('Contact number is required.'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group.' }),
    })
    .optional(),
  presentAddress: z.string().nonempty('Present address is required.'),
  permanentAddress: z.string().nonempty('Permanent address is required.'),
  guardian: z.object({
    fatherName: z.string().nonempty("Father's name is required."),
    motherName: z.string().nonempty("Mother's name is required."),
    contact: z.string().nonempty("Guardian's contact number is required."),
    occupation: z.string().nonempty("Guardian's occupation is required."),
  }),
  profileImage: z
    .string()
    .url('Profile image must be a valid URL.')
    .nonempty('Profile image URL is required.'),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({
        message: 'Status must be either "active" or "blocked".',
      }),
    })
    .default('active'),
});
