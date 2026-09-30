'use client';
import { LoaderIcon } from 'lucide-react';
import { AlertDialog, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertDialogOverlay, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Method } from '@/lib/types';
interface apiProps {
	url: string;
	method: Method;
	action: string;
}

interface configProps {
	url: string;
	method: Method;
	action?: string;
	body?: any;
}
export function checkURL(url:string) {
  return url.startsWith("/api/")? 
  url:url.startsWith("/")? 
  "/api" + url:"/api/" + url
}
type DialogContextType = {
	dialogApi: (url: string, method?: Method, body?:any, api?: apiProps) => void;
};
const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const [config, setConfig] = useState<configProps | null>(null);

	const dialogApi = (url: string, method: Method = 'GET', body?: object, api?: apiProps) => {
		if (api) {
			setConfig({ url: api.url ?? url, method: api.method ?? method, action: api.action, body });
		} else {
			setConfig({ url, method, body });
		}
		setError(null);
		setMessage(null);
		setOpen(true);
	};

	useEffect(() => {
		if (!open || !config) return;

		const run = async () => {
			try {
				setLoading(true);
				console.log(config);
				const res = await fetch(checkURL(config.url), {
					method: config.method,
					body: config.body,
				});
				console.log(config)

				const data = await res.json();

				if (!res.ok) throw new Error(data?.message || data?.error || 'Request failed');

				setMessage(data?.message || 'Success');

				setTimeout(() => setOpen(false), 3000);
			} catch (err: any) {
				setTimeout(() => setOpen(false), 5000);
				console.error(err);
				setError(err.message || 'Unexpected error');
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [open, config]);

	return (
		<DialogContext.Provider value={{ dialogApi }}>
			{children}

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogOverlay onClick={() => setOpen(loading ?? false)}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Processing</AlertDialogTitle>
							<AlertDialogDescription>
								{loading && <LoaderIcon role='status' aria-label='Loading' className='size-8 animate-spin' />}
								{error && <span className='text-red-500'>{error}</span>}
								{message && <span className='text-green-600'>{message}</span>}
							</AlertDialogDescription>
						</AlertDialogHeader>

						{!loading && (
							<AlertDialogFooter>
								<AlertDialogCancel>Close</AlertDialogCancel>
							</AlertDialogFooter>
						)}
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</DialogContext.Provider>
	);
}

export function useDialogApi() {
	const context = useContext(DialogContext);
	if (!context) throw new Error('usedialogApi must be used inside AlertProvider');
	return context;
}
