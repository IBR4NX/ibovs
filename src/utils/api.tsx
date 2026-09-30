// src/lib/api.ts
"use client"
import { toast } from 'sonner';
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};
 let id; // id of 
const messageLoading=<div className="flex justify-between w-full min-w-72">
    <span className="text-left">جارٍ معالجة البيانات...</span><span dir="ltr" className="text-right">Processing data...</span>
  </div>;
import React from "react"
export default function apiFetch<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body: object,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<ApiResponse<T>> {
    
  if (typeof setLoading !=='undefined')setLoading(true)
 // if (typeof id ==="undefined") id=toast.loading( messageLoading,  { position: "top-center" })
  const fetchPromise =new Promise(async(resolve, reject)=>{ 
  const controller = new AbortController();
  const timer = setTimeout(() =>{
    //controller.abort();
    return reject("setTimeout 2000: ");
   }, 30000);
    const res = await fetch(checkURL(url), { signal: controller.signal,
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  clearTimeout(timer);
      console.log(res)
  if(!res.redirected){
      const data = await res.json() ;
      if (!res.ok || data?.error) {
      console.log("Api Fetch Error:",data)
        reject(data?.error || data?.message)
      }
     return resolve(data);
  }
      if(res?.redirected)window.location.href=res.url;
  })

  if (typeof fetchPromise !== "undefined" && typeof id !=="undefined") {
     toast.promise(fetchPromise, {id,
      loading: messageLoading,
      success: (data:string) =>   data ,
      error: (data: string) => data,
      position: "top-center"
    });
  }
  
  if (typeof setLoading !=='undefined') {
    console.log(' if yes is that *** = *** ')
    setTimeout(()=> setLoading(false),1000)
  }
  return  fetchPromise as Promise<ApiResponse<T>>;
}


export function checkURL(url:string) {
  return url.startsWith("/api/")? 
  url:url.startsWith("/")? 
  "/api" + url:"/api/" + url
}