import { cn } from "@/shadcn/utils"
import { RiLoaderLine } from "@remixicon/react"
import { ComponentProps } from "react"
function Spinner({ className, ...props }:ComponentProps<"svg">) {
  return (
    <RiLoaderLine role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...(props as any)} />
  )
}

export { Spinner }
