import { Button } from "@/components/ui";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";
interface Props {
  children: React.ReactNode;
  pending: boolean;
  className?: string;
  type?: "submit" | "button" | "reset";
  size?:
    | "lg"
    | "default"
    | "xs"
    | "sm"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  form?: string;
}
const ButtonSpinner = ({
  children,
  pending = false,
  className,
  type = "submit",
  size = "lg",
  form = "form",
  ...props
}: Props) => {
  return (

    <Button
      type={type}
      size={size}
      form={form}
      className={cn("w-full", className)}
      disabled={pending}
      {...props}
    >
      <>
        {pending && <Spinner />}
        {children}
      </>
    </Button>
    
  );
};
export default ButtonSpinner;
