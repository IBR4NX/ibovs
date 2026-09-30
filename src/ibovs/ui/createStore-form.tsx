'use client';
import {  Card, CardAction, CardContent, CardDescription,  CardFooter,
  CardHeader,  CardTitle,} from "@/components/ui/card";
import Link from "next/link";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  FieldGroup,  Field,  FieldLabel, FieldError,  } from '@/components/ui/field';
    import { Textarea } from "@/components/ui/textarea"
type FormData = {
  name: string;
  slug: string;
  description: string;
};

import LocationPicker from './location'
import InputCheck from './input-check'
import apiFetch from "@/utils/api";
export default function CreateStore() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { name: '', slug: '', description: '' },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    apiFetch( '/api/store','POST', data)
  }

  return (

      <Card>
        <CardHeader>
          <CardTitle>انشاء متجر الالكتروني</CardTitle>
          <CardDescription>
           اكل الحقول مطلوبة
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="/"> خروج</Link>
            </Button>
          </CardAction>
        </CardHeader>
    <form onSubmit={handleSubmit(onSubmit)} className="space">
        <CardContent>
      <FieldGroup>
        {/* الاسم */}
        <Field>
          <FieldLabel>الاسم*</FieldLabel>
          <Input placeholder="أدخل الاسم" {...register('name', { required: 'الاسم مطلوب' })} />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>
        <InputCheck
         // name="slug"
       label="Store Slug"
       endpoint="/api/store/check"
       param="slug"
      {...register('slug', {
            required: "required",
            pattern: { value: /[a-z]/i, message: ' غير صحيح' }
          })}
       />
          <FieldError>{errors.slug?.message}</FieldError>
        

        {/* description */}
        <Field>
          <FieldLabel> وصف المتجر</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="اكتب وصف لمتجرك ."
          {...register('description', {
            required: 'description  ',
            minLength: { value: 20, message: 'على الاقل  20 أحرف' }
          })} 
          aria-invalid={errors.description&&true}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>
      </FieldGroup>
      <Button type="submit" className="w-full mt-5">
        تسجيل
      </Button>
        </CardContent>
    </form>
     </Card>
     
  );
};