"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Form from "@/components/form/form";
type User = {
  name: string;
  email: string;
  imgUrl?: string;
  role?: string;
};
export function convertData(d: object) {
  const fields = ["name", "email", "staus"];
  const fieldsStatic = ["status", "createdAt", "updatedAt", "role"];
  // ترجمة المفاتيح
  const labels: Record<string, string> = {
    name: "الاسم",
    email: "البريد",
    status: "الحالة",
    role: "الدور",
    createdAt: "تاريخ الانشاء",
    updatedAt: "اخر تحديث "
  };
  const dataEntries = Object.entries(d)
    .filter(([key]) => fields.includes(key)) // اختار الحقول المطلوبة فقط
    .map(([key, value]) => ({
      name: labels[key] || key,
      key: key,
      value
    }));
  const data = Object.entries(d)
    .filter(([key]) => fieldsStatic.includes(key)) // اختار الحقول المطلوبة فقط
    .map(([key, value]) => ({
      name: labels[key] || key,
      key: key,
      value
    }));
  console.log(dataEntries);
  return { data, edit: dataEntries };
}
import useSWR, { useSWRConfig } from "swr";
export default function AccountPage() {
  const { data: user } = useSWR("/user");
  const con = convertData(user);
  console.log(con);
  console.log(user["name"]);

  return (
    <>
      <div className='max-w-2xl mx-auto py-10 px-4'>
        <Card size="sm" className="m-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <Form data={con.edit} method="PUT" url="/users" />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
        
      </div>
    </>
  );
}
