import { cn } from "@/shadcn/utils"
import a, { RiLoaderLine } from "@remixicon/react"
import { ComponentProps } from "react"
export function Spinner({ className, ...props }:ComponentProps<"svg">) {

                   
  return (
    <RiLoaderLine role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)}/>
  )
}

