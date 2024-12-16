import { z } from 'zod';

const createAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name must be at least 1 character long.')
      .max(100, 'Name must be less than or equal to 100 characters.'),
    startDate: z.date(),
    endDate: z.date(),
  }),
});

export const AcademicSemesterSchemaValidations = {
  createAcademicSemesterSchemaValidation,
};
