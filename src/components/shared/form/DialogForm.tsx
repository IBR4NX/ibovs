"use client";
import React, { useState, ComponentProps, ReactNode } from "react";
import { useTransition, animated, config } from "@react-spring/web";
const wait = () => new Promise(resolve => setTimeout(resolve, 5000));
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface Props {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  props?: ComponentProps<typeof Dialog>;
  data:any;
  url:string;
}

import Form from "./form";
export function DialogForm({ data, open, onOpenChange, url, ...props }: Props) {
  const transitions = useTransition(open, {
    from: { opacity: 0, transform: "scale(0.8) translateY(-100px)" },
    enter: { opacity: 1, transform: "scale(1) translateY(0px)" },
    leave: { opacity: 0, transform: "scale(0.8) translateY(100px)" },
    config: config.gentle
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {transitions((style, item) =>
          item ? (
            <DialogContent forceMount>
              <animated.div style={style}>
                <DialogHeader className='pb-2'>
                  <DialogTitle>تعديل المعلومات </DialogTitle>
                  <DialogDescription>
                    قم بتعديل الحقول حسب الحاجة هنا. اضغط على حفظ عند اتمام
                    التعديلات.
                  </DialogDescription>
                </DialogHeader>
                <Form data={data} method='PUT' url={url} />
                <DialogFooter>
                  <div className=' grid grid-cols-7 gap-4 pt-2'>
                    <DialogClose className='col-span-3 ' asChild>
                      <Button variant='outline' className=''>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className='col-span-4' type='submit' form='Form'>
                      Submit
                    </Button>
                  </div>
                </DialogFooter>
              </animated.div>
            </DialogContent>
          ) : null
        )}
      </Dialog>
    </>
  );
}
