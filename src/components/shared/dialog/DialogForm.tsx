'use client';
import React, { useState } from 'react';
import { Dialog, DialogClose, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { Method } from '@/lib/types';

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	api: { url: string; method: Method; action: string };
	title?: string;
	children: React.ReactNode;
}
import { useAlertApi } from '@/components/provider/AlertProvider';
export default function DialogForm({ children, open, setOpen, api, title, ...props }: Props) {
	const [form, setForm] = useState({});
	const [message, setMessage] = useState('');
	const { alertApi } = useAlertApi();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const body = Object.fromEntries(formData);
		setForm(body);
		console.log('data');
		const fetchApi= await alertApi('/api',api.method, body,api);
		console.log(fetchApi)
	};
	return (
		<>
			<Dialog open={open} onOpenChange={setOpen} {...props}>
				<DialogContent>
					<DialogHeader className='pb-2'>
						<DialogTitle> {title ? title : 'تعديل المعلومات'} </DialogTitle>
						<DialogDescription>قم بتعديل الحقول حسب الحاجة هنا. اضغط على حفظ عند اتمام التعديلات.</DialogDescription>
					</DialogHeader>
					<form id='DialogForm' name='DialogForm' onSubmit={handleSubmit} className='py-4 min-h-[30vh] '>
						<input type='text' name='action' hidden defaultValue={api.action} />
						{children}
						{message && <span className='text-red-500'>{message}</span>}
					</form>
					<DialogFooter>
						<div className=' grid grid-cols-7 gap-4 pt-2'>
							<DialogClose className='col-span-3 ' asChild>
								<Button variant='outline' className=''>
									Cancel
								</Button>
							</DialogClose>
							<Button className='col-span-4' type='submit' form='DialogForm'>
								Submit
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
