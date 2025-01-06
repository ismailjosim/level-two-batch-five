import { z } from 'zod';

const createAcademicDepartmentSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      required_error: 'Name is required',
    }),
  }),
});
const updateAcademicDepartmentSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    academicFaculty: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentSchemaValidation,
  updateAcademicDepartmentSchemaValidation,
};
