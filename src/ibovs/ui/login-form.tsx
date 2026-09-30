"use client";
// import { useForm } from "react-hook-form";
import Link from "next/link";
import Form from "next/form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/app/action/auth";
import { useActionState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
  
import actionToast from "@/utils/action-toast";
const LoginForm = () => {
  // const { handleSubmit } = useForm();
  const [state, action, pending] = useActionState(login,undefined );
useEffect(() =>actionToast(state,pending), [pending,state]);
console.log(state,pending)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> تسجيل الدخول</CardTitle>
          <CardDescription>أدخل البريد الالكتروني وكلمة المرور</CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="signup">انشاء حساب</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <Form action={action} id="form"
        // onSubmit={()=>actionToast(state)}
        >
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">البريد الالكتروني</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={pending}
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
                  <Link
                    dir=""
                    href="#"
                    className=" inline-block text-sm underline-offset-4 hover:underline"
                  >
                    هل نسيت كلمة المرور؟
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                />{" "}
              </Field>
              <FieldError>
                {state?.message&& state?.message}
              </FieldError>
              <CardFooter className="flex-col  gap-2">
                <Button
                  type="submit"
                  size="lg"
                  form="form"
                  className="w-full"
                  disabled={pending}
                >
                  <>
                    {pending && <Spinner />}
                     تسجيل الدخول
                  </>
                </Button>
              </CardFooter>
            </FieldGroup>
          </CardContent>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
