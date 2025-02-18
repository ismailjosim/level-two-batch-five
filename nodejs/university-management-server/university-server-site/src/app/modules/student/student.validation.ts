import { z } from 'zod';

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: z.object({
        firstName: z
          .string()
          .min(2, 'First name must be at least 2 characters long.')
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
        .email('You must Provide a valid email address.')
        .nonempty('Email is required.'),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['male', 'female', 'others'], {
        errorMap: () => ({
          message: 'Gender must be either "male", "female", or "others".',
        }),
      }),
      contactNo: z.string().nonempty('Contact number is required.'),
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
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImage: z
        .string()
        .url('Profile image must be a valid URL.')
        .nonempty('Profile image URL is required.'),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: z
          .object({
            firstName: z
              .string()
              .min(2, 'First name must be at least 2 characters long.')
              .max(
                20,
                'First name must be less than or equal to 20 characters.',
              )
              .regex(
                /^[A-Z][a-zA-Z]*$/,
                'First name must start with an uppercase letter and contain only alphabetic characters.',
              )
              .optional(),
            middleName: z.string().optional(),
            lastName: z
              .string()
              .regex(
                /^[a-zA-Z]+$/,
                'Last name must contain only alphabetic characters.',
              )
              .optional(),
          })
          .optional(),
        email: z
          .string()
          .email('You must provide a valid email address.')
          .optional(),
        dateOfBirth: z.string().optional(),
        gender: z
          .enum(['male', 'female', 'others'], {
            errorMap: () => ({
              message: 'Gender must be either "male", "female", or "others".',
            }),
          })
          .optional(),
        contactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
            errorMap: () => ({ message: 'Invalid blood group.' }),
          })
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: z
          .object({
            fatherName: z.string().optional(),
            motherName: z.string().optional(),
            contact: z.string().optional(),
            occupation: z.string().optional(),
          })
          .optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImage: z
          .string()
          .url('Profile image must be a valid URL.')
          .optional(),
      })
      .partial(), // Makes all nested fields optional
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
