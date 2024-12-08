import { z } from 'zod';

const userSchemaValidation = z.object({
  id: z.string().nonempty({ message: 'ID is required and cannot be empty.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(20, { message: 'Password cannot exceed 20 characters.' }),
  needPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['admin', 'student', 'faculty'], {
    message: "Role must be one of 'admin', 'student', or 'faculty'.",
  }),
  dateOfBirth: z.date({
    message: 'date Of Birth must be a valid date.',
  }),
  email: z.string().email({ message: 'Email must be a valid email address.' }),
  status: z.enum(['in-progress', 'blocked'], {
    message: "Status must be 'in-progress' or 'blocked'.",
  }),
  isDeleted: z.boolean().optional().default(false),
});

export default userSchemaValidation;
