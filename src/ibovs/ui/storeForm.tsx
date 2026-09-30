"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputCheck from "./input-check";

export type StoreFormValues = {
  name: string;
  slug: string;
  description: string;
};

type StoreFormProps = {
  defaultValues?: StoreFormValues;
  onSubmit: (data: StoreFormValues) => void | Promise<void>;
  loading?: boolean;
  submitText?: string;
};

export default function StoreForm({
  defaultValues = { name: "", slug: "", description: "" },
  onSubmit,
  loading = false,
  submitText = "حفظ",
}: StoreFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormValues>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel>الاسم*</FieldLabel>
          <Input
            placeholder="أدخل الاسم"
            {...register("name", { required: "الاسم مطلوب" })}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        {/* Slug */}
        <InputCheck
        defaultValue={defaultValues.slug}
          label="Store Slug"
          endpoint="/api/store/check"
          param="slug"
          {...register("slug", {
            required: "Slug مطلوب",
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "صيغة غير صحيحة",
            },
          })}
        />
        <FieldError>{errors.slug?.message}</FieldError>

        {/* Description */}
        <Field>
          <FieldLabel>وصف المتجر*</FieldLabel>
          <Textarea
            placeholder="اكتب وصف لمتجرك"
            {...register("description", {
              required: "الوصف مطلوب",
              minLength: { value: 20, message: "على الأقل 20 حرف" },
            })}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={loading} className="w-full mt-5">
        {loading ? "جاري الحفظ..." : submitText}
      </Button>
    </form>
  );
}