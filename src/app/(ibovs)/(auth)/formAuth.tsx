"use client";
import {
  Card, CardAction, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  FieldGroup, Field, FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Spinner } from "@/components/ui/spinner";
type FormData = {
  action: string;
  name: string;
  email: string;
  password: string;
};
import apiFetch from "@/utils/api";
import { useSlideIn , motion} from "@/shadcn/hooks/use-slide-in";

//import {authAction} from '@/controller/user.controller'

export default function AuthPage({ action }: { action: string }) {
  const isLogin = action === "login"
  console.log(action);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { action: action, name: '', email: '', password: '' },
  });
  // const [state, dispatchAction, isPending] = React.useActionState(authAction,undefined)
  const [loading, setLoading] = React.useState(false)
  const onSubmit = (data: FormData) => {
    apiFetch('/api/user', 'POST', data, setLoading)
  }
  const animation = useSlideIn({
    direction: 'down',
    distance: 100,
    duration: 0.6,
  });


  return (
      <motion.div  {...animation}>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              {isLogin ?
                "تسجيل الدخول" : "انشاء حساب"
              }
            </CardTitle>
            <CardDescription>
              أدخل البريد الالكتروني وكلمة المرور
            </CardDescription>
            <CardAction>
              <Button variant="link">
                {isLogin ?
                  <Link href="signup">انشاء حساب  </Link>
                  :
                  <Link href="login">تسجيل الدخول</Link>
                }
              </Button>
            </CardAction>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space" id="form">
            <CardContent>
              <FieldGroup>
                {!isLogin &&

                  <Field>
                    <FieldLabel>الاسم</FieldLabel>
                    <Input placeholder="أدخل الاسم" {...register('name', { required: 'الاسم مطلوب' })} />
                  </Field>
                }
                <FieldError>{errors.name?.message}</FieldError>

                {/* الإيميل */}
                <Field>
                  <FieldLabel>الإيميل</FieldLabel>
                  <Input type="email" placeholder="دخل الإيميل"
                    {...register('email', {
                      required: 'الإيميل مطلوب',
                      pattern: { value: /^\S+@\S+$/i, message: 'الإيميل غير صحيح' }
                    })} />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>

                {/* الباسورد */}
                <Field>
                  <FieldLabel>كلمة المرور</FieldLabel>
                  <Input type="password" placeholder="أدخل كلمة المرور" {...register('password', {
                    required: 'كلمة المرور مطلوبة',
                    minLength: { value: 6, message: 'كلمة المرور على الأقل 6 أحرف' }
                  })} />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>
              </FieldGroup>
              <CardFooter className="flex-col mt-10   gap-2">
                <CardAction></CardAction>
                <Button
                  type="submit" size="lg" form="form"
                  className="w-full"
                  disabled={loading}
                >
                  <>
                    {loading && <Spinner />}
                    {isLogin ?
                      "تسجيل الدخول"
                      :
                      "انشاء حساب"
                    }
                  </>
                </Button>
              </CardFooter>
            </CardContent>
          </form>
        </Card>
      </motion.div>
  )
}