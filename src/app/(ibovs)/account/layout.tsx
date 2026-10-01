"use client"; // Client Component لأننا نستخدم SWR
import { useState, useEffect } from "react";
import { AlertProvider } from "@/components/provider/AlertProvider";
import Providers from "@/services/SWRConfig.service";
export default function AccountLayout({
  children
}: {
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("setLoading stop");
    }
  }, [0]);
  if (!loading) return null;
  console.log("render");
  console.log("after loading");
  return (
    <>
    <Providers>

      <AlertProvider>{children}</AlertProvider>
    </Providers>
      <div className='fixed left-3 bg-whifte si top-1'>
        <span className='spinner8 size-4 bg-conic from-blue-500 to-black to-50%' />
        <div className='text-4xl font-bold bg-[conic-gradient(from_0deg,var(--color-blue-500),black)] bg-clip-text text-transparent'>
        </div>
        <div
          className='size-0.5 bg-blue-500'
          style={{
            clipPath: "circle(70% at 50% 50%)"
          }}
        />
      </div>
    </>
  );
}
