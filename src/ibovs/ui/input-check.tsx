"use client";

import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

type InputCheckProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  endpoint: string; // مثال: /api/store/check
  param?: string;   // اسم البراميتر في API
  minLength?: number;
  debounce?: number;
  defaultValue?: string;
  onValidChange?: (value: string, available: boolean | null) => void;
};

export default function InputCheck({
  label,
  name,
  endpoint,
  param,
  minLength = 3,
  debounce = 500,
  defaultValue = "",
  onValidChange,
  onChange,
  ...props
}: InputCheckProps) {
  const [text, setText] = useState(defaultValue);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(text);
    const checkValue = async () => {
      if(text)setLoading(true);
      if (text.length < minLength) {
        setIsAvailable(null);
        onValidChange?.(text, null);
        return;
      }

      try {
        const queryParam = param || name;
        const res = await fetch(
          `${endpoint}?${queryParam}=${encodeURIComponent(text)}`
        );
        const data = await res.json();

        setIsAvailable(data.available);
        onValidChange?.(text, data.available);
      } catch {
        setIsAvailable(null);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(checkValue, debounce);
    return () => clearTimeout(timeout);
  }, [text]);
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onChange?.(e); // مهم ل react-hook-form
  };
  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}

      <InputGroup>
        <InputGroupInput
          {...props}
           value={text}
           name={name}
          placeholder={`${name} او اي شيء`}
          onChange={handleChange}
        />
        <InputGroupAddon align="inline-end">
          {loading?<Spinner/>:
          <> {isAvailable === true && <span>✓</span>} </>
          }
          
        </InputGroupAddon>
      </InputGroup>

      {isAvailable === false && (
        <FieldError>القيمة مستخدمة مسبقاً</FieldError>
      )}
    </Field>
  );
}