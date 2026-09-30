"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/shared/inputs";
import { DialogForm } from "@/components/shared/dialog";
export default function DialogFormPassword() {
    const [open, setOpen] = useState(false);
	return (
		<>
			<Button className='col-span-2' variant='outline' onClick={() => setOpen(!open)}>
				Edit Password
			</Button>
			<DialogForm open={open} setOpen={setOpen} api={{ url: "/user", method: "PUT", action: "password" }}>
				<>
					<PasswordInput name='password' label='كلمة المرور الحالية ' />
					<PasswordInput name='new' label='كلمة المرور الجديدة' />
					<PasswordInput name='confirm' label='تأكيد كلمة المرور ' placeholder='تأكيد كلمة المرور' />
				</>
			</DialogForm>
		</>
	);
}
