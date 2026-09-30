"use client";
import  { useState,ChangeEvent } from "react";
const wait = () => new Promise(resolve => setTimeout(resolve, 5000));
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import apiFetch from "@/utils/api";
import { useAlertApi } from "@/components/AlertProvider"
export default function Form({ data ,url,method }) {
  const [form, setForm] = useState({});
  const { alertApi } = useAlertApi()
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("#----- ",url);
    alertApi(`/api${url}`, method, form)
  }
  return (
    <>
      <form
        id='Form'
        name='Form'
        onSubmit={handleSubmit}>
        <div className='-mx-4 gap-4 flex flex-col py-4 no-scrollbar min-h-[30vh] max-h-[50vh] overflow-y-auto px-4'>
          {data.map(item => (
            <InputGroup key={item.key}>
              <InputGroupInput
                id={item.key}
                name={item.key}
                onChange={handleChange}
                defaultValue={item.value}
              />
              <InputGroupAddon className='px-2'>{item.name}</InputGroupAddon>
            </InputGroup>
          ))}
        </div>
      </form>
    
    </>
  );
}
