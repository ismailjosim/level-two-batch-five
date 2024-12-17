import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from './academicSemester.constant';
import {} from './academicSemester.interface';
import { z } from 'zod';

const createAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNames] as [string, ...string[]], {
      required_error: 'Name is required',
      invalid_type_error: 'Name must be one of the predefined semester names',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: 'Code is required',
      invalid_type_error:
        'Code must be one of the predefined codes (e.g., "01", "02", "03")',
    }),
    year: z
      .string({
        required_error: 'Year is required',
        invalid_type_error: 'Year must be a string',
      })
      .refine((val) => /^\d{4}$/.test(val), {
        message: 'Year must be a valid 4-digit string (e.g., "2025")',
      }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
      invalid_type_error: 'Start month must be one of the predefined months',
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
      invalid_type_error: 'End month must be one of the predefined months',
    }),
  }),
});

const updateAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNames] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z
      .enum([...AcademicSemesterMonths] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...AcademicSemesterMonths] as [string, ...string[]])
      .optional(),
  }),
});

export const AcademicSemesterSchemaValidations = {
  createAcademicSemesterSchemaValidation,
  updateAcademicSemesterSchemaValidation,
};
