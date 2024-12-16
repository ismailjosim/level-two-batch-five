import { z } from 'zod';

const userSchemaValidation = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be String',
    })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(20, { message: 'Password cannot exceed 20 characters.' })
    .optional(),
});

export default userSchemaValidation;
