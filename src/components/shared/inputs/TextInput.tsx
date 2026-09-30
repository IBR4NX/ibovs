"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group";
import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name?:string
  label?: string;
  description?: string;
  error?: string;
  className?: string;
};

export default function TextInput({
  name,
  label,
  description,
  error,
  className,
  id,
  ...props
}: TextInputProps) {
  const inputId = id ?? name;

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <InputGroup>
        <InputGroupInput
          name={name}
          id={inputId}
          {...props}
        />
      </InputGroup>

      {description && !error && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}