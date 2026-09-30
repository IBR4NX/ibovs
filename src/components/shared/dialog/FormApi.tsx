"use client";
import  { useState,ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import apiFetch from "@/utils/api";
const wait = () => new Promise(resolve => setTimeout(resolve, 5000));
import { useAlertApi } from "@/components/provider/AlertProvider"
interface Props {
  children: React.ReactNode;
  url:string;
  method:string;
}
export default function FormApi({url, method, children }:Props) {
  const [form, setForm] = useState({});
  const { alertApi } = useAlertApi()
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    wait().then((result) => {
      console.log("begin wait ");
    alertApi(`/api${url}`, method, form)
    })
  }
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
