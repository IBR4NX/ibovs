"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import type { Method } from "@/lib/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAlertApi } from "@/components/provider/AlertProvider";

export type FormItem = {
  key: string | number;
  name: string;
  value?: string | number | null;
};

interface FormProps {
  data: FormItem[];
  url: string;
  method: Method;
}

export default function Form({ data, url, method }: FormProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const { alertApi } = useAlertApi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("#----- ", url);
    alertApi(`/api${url}`, method, form);
  };

  return (
    <>
      <form
        id='Form'
        name='Form'
        onSubmit={handleSubmit}
      >
        <div className='-mx-4 gap-4 flex flex-col py-4 no-scrollbar min-h-[30vh] max-h-[50vh] overflow-y-auto px-4'>
          {data.map(item => (
            <InputGroup key={String(item.key)}>
              <InputGroupInput
                id={String(item.key)}
                name={String(item.key)}
                onChange={handleChange}
                defaultValue={item.value != null ? String(item.value) : undefined}
              />
              <InputGroupAddon className='px-2'>{item.name}</InputGroupAddon>
            </InputGroup>
          ))}
        </div>
      </form>
    </>
  );
}
