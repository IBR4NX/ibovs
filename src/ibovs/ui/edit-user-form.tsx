"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import Form from "next/form";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useOptimistic, startTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAvatar, updateProfile } from "@/app/api/profile";
import { Spinner } from "@/components/ui/spinner";
import { useActionState } from "react";
import ImgUpload from "@/ibovs/ui/imgUpload";
interface EditProfilePorps {
  user?: { name: string; email: string; imgUrl?: string };
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  props?: React.ComponentProps<typeof Dialog>;
}
import { useTransition, animated } from "@react-spring/web";
export function EditProfile({
  children,
  user,
  open,
  onOpenChange,
  ...props
}: EditProfilePorps) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  const [stateAvatar, actionAvatar, pendingAvatar] = useActionState(
    updateAvatar,
    undefined
  );
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    user?.imgUrl ?? null
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // actionAvatar();
    }
  };
  console.log(state, pending);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // action(e.currentTarget);
    // console.log(e.currentTarget.avatar.value);
  };
  console.log("edit open:", props, open);
  const transitions = useTransition(open, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-20px)" }
  });
  return (
    <>
      {transitions((style, item) =>
        item ? (
          <animated.div style={style}>
            <Dialog {...props} open={open} onOpenChange={onOpenChange}>
              <DialogTrigger asChild className=' p-2'>
                {children}
              </DialogTrigger>
              <DialogContent className='sm:max-w-sm'>
                <DialogHeader>
                  <DialogTitle>تعديل معلومات </DialogTitle>
                  <DialogDescription>
                    ادخل معلومات المستخدم هنا. اضغط على حفظ عند اتمام التعديلات.
                  </DialogDescription>
                </DialogHeader>
                <Form action={action} onSubmit={handleSubmit} id='form'>
                  <FieldGroup>
                    <ImgUpload className='size-24' size={100}></ImgUpload>
                    <InputGroup>
                      <InputGroupInput
                        id='name'
                        name='name'
                        defaultValue={user?.name}
                      />
                      <InputGroupAddon className='px-2'>الاسم</InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                      <InputGroupInput
                        id='email'
                        name='email'
                        defaultValue={user?.email}
                      />
                      <InputGroupAddon className='px-2'>البريد</InputGroupAddon>
                    </InputGroup>
                  </FieldGroup>
                  <DialogFooter className='mt-4 flex'>
                    {state?.message && (
                      <p className='text-red-500'>{state?.message}</p>
                    )}
                    <DialogClose asChild>
                      <Button variant='outline'>إلغاء</Button>
                    </DialogClose>
                    <Button
                      // type="submit"
                      disabled={pending}
                      form='form'>
                      {pending && <Spinner />}
                      حفظ التعديلات
                    </Button>
                  </DialogFooter>
                </Form>
              </DialogContent>
            </Dialog>
          </animated.div>
        ) : null
      )}
    </>
  );
}
export default EditProfile;
