 import { z } from "zod";


const StoreSchema = z.object({
  name: z.string().min(3, "اسم المتجر يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  phone: z.string().min(8, "رقم الهاتف غير صالح"),
  address: z.string().min(5, "العنوان مطلوب"),
  slug: z.string().min(5, "الرابط مطلوب"),
  location: z.object({
    city: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
});

export type FormState = {
  success?: boolean;
  errors?: {
    name?: string[];
    description?: string[];
    phone?: string[];
    address?: string[];
    slug?: string[];
    location?: {
      city?: string[];
      lat?: string[];
      lng?: string[];
    };
  };
  message?: string;
}|undefined