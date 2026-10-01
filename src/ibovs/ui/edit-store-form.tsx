// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import Form from "next/form";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// interface EditProfilePorps {
//   user?: { name: string; email: string; avatar?: string };
//   children: React.ReactNode;
// }
// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { updateAvatar } from "@/app/api/profile";
// import { Spinner } from "@/components/ui/spinner";
// import { createStore } from "@/controllers/repositories/store.repository";

// import { useActionState } from "react";

// export function EditStore({ children, user }: EditProfilePorps) {
//   const [state, action, pending] = useActionState(createStore, undefined);
//   const [stateAvatar, actionAvatar, pendingAvatar] = useActionState(updateAvatar, undefined);
//   const [imagePreview, setImagePreview] = React.useState<string | null>(
//     user?.avatar ?? null
//   );
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   return (
//     <Dialog>
//       <DialogTrigger className=" p-2">{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-sm">
//           <DialogHeader>
//             <DialogTitle>تعديل معلومات </DialogTitle>
//             {/* <DialogDescription>
//               ادخل معلومات المستخدم هنا. اضغط على حفظ عند اتمام التعديلات.
//             </DialogDescription> */}
//           </DialogHeader>
//             <Form action={actionAvatar} className="flex items-center px-10" >
//             <Avatar className="w-24 h-24 m-auto">
//               <Label htmlFor="avatar">
//                 <AvatarImage src={imagePreview ?? undefined} />
//               </Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 id="avatar"
//                 name="logo"
//                 className=" absolute size-full opacity-0 text-wrap z-10 bg-red-500 rounded-full"
//                 onChange={handleImageChange}
//                 />
//               <AvatarFallback>اضافة الصورة</AvatarFallback>
//             </Avatar>
//               <Button type="submit" > حفظ الصورة
//               </Button>
//                 </Form>
//              <Form action={action}  id="form">
//             <FieldGroup>
//               <Field>
//               <FieldLabel htmlFor="name">اسم المتجر</FieldLabel>
//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="اسم المتجر"
//                 disabled={pending}
//               />
//             </Field>
//             {/* slug */}
//             <Field>
//               <FieldLabel htmlFor="slug">الرابط</FieldLabel>
//               <Input
//                 id="slug"
//                 name="slug"
//                 placeholder="store-slug"
//                 disabled={pending}
//               />
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="description">الوصف</FieldLabel>
//               <Input
//                 id="description"
//                 name="description"
//                 placeholder="وصف المتجر"
//                 disabled={pending}
//               />
//               {/* <FieldError>{error?.description}</FieldError> */}
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
//               <Input
//                 id="phone"
//                 name="phone"
//                 placeholder="رقم الهاتف"
//                 disabled={pending}
//               />
//               {/* <FieldError>{error?.phone}</FieldError> */}
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="address">العنوان</FieldLabel>
//               <Input
//                 id="address"
//                 name="address"
//                 placeholder="العنوان"
//                 disabled={pending}
//               />
//               {/* <FieldError>{error?.address}</FieldError> */}
//             </Field>
//           </FieldGroup>
//           <DialogFooter className="mt-4">
//             {/* {state?.message && <p className="text-red-500">{state?.message}</p>} */}
//             <DialogClose asChild>
//               <Button variant="outline">إلغاء</Button>
//             </DialogClose>
//             <Button
//               // type="submit"
//               disabled={pending}
//               form="form"
//             >
//               {pending && <Spinner />}
//               حفظ التعديلات
//             </Button>
//           </DialogFooter>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
// export default EditStore;
