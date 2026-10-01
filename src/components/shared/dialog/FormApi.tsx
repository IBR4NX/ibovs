"use client";
import { useState, ChangeEvent, FormEvent, ReactNode } from "react";
const wait = () => new Promise(resolve => setTimeout(resolve, 5000));
import { useAlertApi } from "@/components/provider/AlertProvider";
import type { Method } from "@/lib/types";

interface Props {
  children: ReactNode;
  url: string;
  method: Method;
}

export default function FormApi({ url, method, children }: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const { alertApi } = useAlertApi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    await wait();
    console.log("begin wait ");
    alertApi(`/api${url}`, method, form);
  };
  return (
    <>
      <form
        id='Form'
        name='Form'
        onSubmit={handleSubmit}
        className="py-4 min-h-[30vh] ">
        <div className='gap-4 flex flex-col no-scrollbar max-h-[50vh] overflow-y-auto'>
          {children}
        </div>
      </form>
    
    </>
  );
}
