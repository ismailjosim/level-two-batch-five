import { z } from 'zod';

const createAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});
const updateAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultySchemaValidation,
  updateAcademicFacultySchemaValidation,
};
