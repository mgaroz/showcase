import { z } from 'zod'
import { Blob } from 'node:buffer'

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email.' }),
  password: z.string({ required_error: 'Password is required' })
})

export const registerUserSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' })
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(64, { message: 'Name must be less than 64 characters long' })
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email' }),
  password: z
    .string({ required_error: 'Password is required.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be at least 8 characters long & contain at least one letter, one digit and one special character' }),
  passwordConfirm: z
    .string({ required_error: 'Confirm Password is required.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be at least 8 characters long & contain at least one letter, one digit and one special character' })
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

const imageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
]

export const createProjectSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name must not be empty and at least 2 characters long' })
    .max(64, { message: 'Name cannot exceed 64 characters' })
    .trim(),
  tagline: z
    .string({ required_error: 'Tagline is required' })
    .min(2, { message: 'Tagline must not be empty and at least 2 characters long' })
    .max(64, { message: 'Tagline cannot exceed 64 characters' })
    .trim(),
  url: z
    .string({ required_error: 'URL is required' })
    .url({ message: 'URL must be a valid URL' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2, { message: 'Description must not be empty and at least 2 characters long' })
    .max(512, { message: 'Description cannot exceed 512 characters' })
    .trim(),
  thumbnail: z
    .instanceof(Blob)
    .optional()
    .superRefine((val, ctx) => {
      if (val) {
        if (val.size > 5242880) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Thumbnail must be less than 5MB'
          })
        }
        if (!imageTypes.includes(val.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
          })
        }
      }
    }),
  user: z.string({ required_error: 'User is required' })
})

export const updateProjectSchema = createProjectSchema.omit({ user: true })

export const updateEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email' })
})

export const updateUsernameSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(24, { message: 'Username must not exceed 24 characters' })
    .regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers' })
})

export const updatePasswordSchema = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  password: z
    .string({ required_error: 'Password is required.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be at least 8 characters long & contain at least one letter, one digit and one special character' }),
  passwordConfirm: z
    .string({ required_error: 'Confirm Password is required.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be at least 8 characters long & contain at least one letter, one digit and one special character' })
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

export const updateProfileSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' })
    .min(2, { message: 'Name must not be empty and at least 2 characters long' })
    .max(64, { message: 'Name must be less than 64 characters long' })
    .trim(),
  avatar: z
    .instanceof(Blob)
    .optional()
    .superRefine((val, ctx) => {
      if (val) {
        if (val.size > 5242880) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Avatar must be less than 5MB'
          })
        }
        if (!imageTypes.includes(val.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
          })
        }
      }
    })
})