import React from "react";
import { cn } from "@/shadcn/utils"
interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  radius?: number;
  strokeWidth?: number;
  strokeColor?: string;
  dashArrayStart?: number;
  dashArrayEnd?: number;
  spinDuration?: string;
  dashDuration?: string;
  className?:string;
}

export function Spinner({
  width = 50,
  height = 50,
  size = 60,
  radius = 90,
  strokeWidth = 5,
  strokeColor = "orange",
  dashArrayStart = 50,
  dashArrayEnd = 565,
  spinDuration = "1s",
  dashDuration = "3s",
  className = "",
  ...props
}: SpinnerProps) {
  const center = Number(radius) + Number(strokeWidth); // مركز الدائرة
//  console.log(className,strokeColor,spinDuration, dashDuration)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${center * 2} ${center * 2}`}
      className={cn('spinCircle stroke-amber-400 ',className)}
      {...props}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
       // stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashArrayStart} ${dashArrayEnd}`}
        strokeDashoffset={0}
      />
    </svg>
  );
}
export default Spinner