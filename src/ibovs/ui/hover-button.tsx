"use client";

import React from "react";
import { cn } from "@/shadcn/utils";
import { Button } from "@/components/ui/button";
import HoverArrowButton from "@/ibovs/ui/hover-arrow-button";

interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // Explicitly kept if needed, though extended types usually cover it
  children: React.ReactNode;
}

const HoverButton = ({
  className,
  children = "Book a Call",
  ...props
}: GlowButtonProps) => {
  return (
    <Button variant="secondary" asChild className={cn(`p-0`, className)} {...props}>
      <HoverArrowButton text={`${children}`} />
    </Button>
  );
};

export default HoverButton;
