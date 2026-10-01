"use client";

import React, { useState, ChangeEvent } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> &{
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function PasswordInput({
  label = "كلمة المرور ",
  name = "password",
  placeholder,
  description,
  defaultValue = "",
  value,
  onChange,
  className,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <InputGroup>
        <InputGroupInput
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder ?? `أدخل ${label}`}
          value={inputValue}
          onChange={handleChange}
          {...props}
        />

        <InputGroupAddon
          align="inline-end"
          className="cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </InputGroupAddon>
      </InputGroup>

      {description && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </Field>
  );
}