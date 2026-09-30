// 'use server' 
import * as z from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(5, { error: 'الاسم يجب ان يحتوي على 5 احرف على الأقل' })
    .trim(),
  email: z.email({ error: 'البريد الالكتروني يجب ان يكون صحيح' }).trim(),
  password: z
    .string()
    .min(8, { error: 'كلمة المرور يجب ان تكون 8 احرف على الأقل' })
    .regex(/[a-zA-Z]/, { error: 'يجب ان يحتوي على حرف' })
    .regex(/[0-9]/, { error: 'يجب ان يحتوي على رقم' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'يجب ان يحتوي على حرف',
    })
    .trim(),
})
export type FormState =
   {
    success?:boolean,
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


