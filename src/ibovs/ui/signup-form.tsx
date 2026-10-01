// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Spinner } from "@/components/ui/spinner";
//   import { signup } from '@/app/action/auth'
//   import { useActionState } from 'react'
// import Form from "next/form";

  
//   import actionToast from "@/utils/action-toast";
//   export default function SignUpForm() {
//   const [state, action, pending] = useActionState(signup, undefined)
//   const [password, setPassword] = useState("");
//   //const [loading, setLoading] = useState(false);
//   //const [message, setMessage] = useState("");
//  // const nav = useRouter();
//   const error=state?.errors;
//   console.log(state)
//   useEffect(() => {
//   if(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)){
//   }
//     // return () => 
//   }, [password])
// useEffect(() =>actionToast(state,pending), [pending,state]);
//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle>انشاء حساب</CardTitle>
//           <CardDescription>
//             أدخل الاسم والبريد الالكتروني وكلمة المرور
//           </CardDescription>
//           <CardAction>
//             <Button variant="link">
//               <Link href="login">تسجيل الدخول</Link>
//             </Button>
//           </CardAction>
//         </CardHeader>
//           <Form action={action} id="form">
//         <CardContent>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="name">الاسم</FieldLabel>
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="الاسم"
//                   required
//                   disabled={pending}
//                   // value={name}
//                   // onChange={(e) => setName(e.target.value)}
//                   />
//                   <FieldError  >{error?.name}</FieldError>
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="email">البريد الالكتروني</FieldLabel>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="البريد الالكتروني"
//                   disabled={pending}
//                   // value={email}
//                   // onChange={(e) => setEmail(e.target.value)}
//                 />
//                   <FieldError  >{error?.email}</FieldError>
//               </Field>
//               {/* <FieldGroup className="grid -mt-4 grid-cols-1 gap-4"> */}
//                 <Field data-invalid={state?.errors?.password }>
//                   <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="كلمة المرور"
//                     disabled={pending}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 <FieldError >
//                    {password && 
//                    <>
//                 {!/^(?=.*[a-z])/.test(password)&& <p>يجب ان تحتوي على حرف صغير</p>}
//                 {!/^(?=.*[A-Z])/.test(password)&& <p>يجب ان تحتوي على حرف كبير</p>}
//                 {!/^(?=.*[0-9])/.test(password)&& <p>يجب ان تحتوي على رقم</p>}
//                 {/* {/(?=.*[a-z])/.test(password)&&} */}
//                 </>
//                   }
//                 </FieldError>
//                 </Field>
//                 {error?.password && (
//                   <FieldError>
//                     <ul>
//                       {error?.password.map((err) => (
//                         <li key={err}>- {err}</li>
//                       ))}
//                     </ul>
//                   </FieldError>
//                 )}

//           <CardFooter className="flex-col  gap-2">
//             {state?.message&& state?.message}
//             <Button
//               type="submit"
//               size="lg"
//               form="form"
//               className="w-full"
//               disabled={pending}
//               >
//                 <>
//               {pending && <Spinner />}
//               انشاء حساب 
//                 </>
//             </Button>
//           </CardFooter>
//                 </FieldGroup>
//         </CardContent>
//               </Form>
//       </Card>
//     </>
//   );
// }
