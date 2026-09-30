"use client"
import { SWRConfig } from "swr"

const fetcher3 = (url: string) => fetch(`/api${url}`).then(res => res.json())
export const fetche= async (url: string) => {
  const res = await fetch(`/api${url}`);
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json();
};
export default function Providers({ children }: { children: React.ReactNode }) {
  
  return (
    <SWRConfig
      value={{
        fetcher: fetcher3,
        provider: provider,
        refreshInterval:50000,
        revalidateOnFocus: false,
        fallback:{
          '/user':{name:"",email:"",imgUrl:""}
        }
      }}
    >
      {children}
    </SWRConfig>
  )
}

function provider() {
  if (typeof window === "undefined") {
    return new Map()
  }
  const stored = window.localStorage.getItem("app-cache")
  const map = new Map(stored ? JSON.parse(stored) : [])
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    window.localStorage.setItem("app-cache", appCache)
  })
  return map
}