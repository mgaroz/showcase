import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email must be a valid email.' }),
  password: z.string({ required_error: 'Password is required' })
})

export const registerUserSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' }).min(2, { message: 'Name must be at least 2 characters long' }).max(64, { message: 'Name must be less than 64 characters long' }).trim(),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email must be a valid email' }),
  password: z.string({ required_error: 'Password is required.' }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be at least 8 characters long & contain at least  one letter, one digit and one special character' }),
  passwordConfirm: z.string({ required_error: 'Confirm Password is required.' }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be at least 8 characters long & contain at least  one letter, one digit and one special character' })
}).superRefine(({ passwordConfirm, password }, ctx) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['password']
    })
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['passwordConfirm']
    })
  }
})