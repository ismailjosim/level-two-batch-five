import { z } from 'zod';

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
  password: z.string().max(30),
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
  isDeleted: z.boolean().optional(),
});
