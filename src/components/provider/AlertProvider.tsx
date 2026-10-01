'use client';
import { LoaderIcon } from 'lucide-react';
import { AlertDialog, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertDialogOverlay, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import React, { createContext, useContext, useEffect, useState , useRef} from 'react';
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
	body?: object;
}
export function checkURL(url:string) {
  return url.startsWith("/api/")? 
  url:url.startsWith("/")? 
  "/api" + url:"/api/" + url
}
type AlertContextType = {
	alertApi: (url: string, method?: Method, body?: object, api?: apiProps) => void;
	loading?: boolean;
	message?:string|null;
};
const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);
	const [config, setConfig] = useState<configProps | null>(null);

	const alertApi = (url: string, method: Method = 'GET', body?: object, api?: apiProps) => {
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
		  abortRef.current?.abort(); // إلغاء أي fetch سابق
      const controller = new AbortController();
       abortRef.current = controller;
			try {
				setLoading(true);
				const res = await fetch(checkURL(config.url), {
					method: config.method, signal: controller.signal,
					headers: { 'Content-Type': 'application/json' },
					body: config.body ? JSON.stringify(config.body) : undefined,
				});

				const data = await res.json();

				if (!res.ok) throw new Error(data?.message || data?.error || 'Request failed');

				setMessage(data?.message || 'Success');

				setTimeout(() => setOpen(false), 3000);
			} catch (err: unknown) {
				setTimeout(() => setOpen(false), 5000);
				console.error(err);
				setError((err as Error).message || 'Unexpected error');
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [open, config]);

const handleCancel = () => {
    if (abortRef.current) abortRef.current.abort(); // إلغاء fetch الحالي
    setOpen(false);
    setLoading(false);
    //setMessage('تم الإلغاء');
  };
  
	return (
		<AlertContext.Provider value={{ alertApi, loading, message}}>
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

							<AlertDialogFooter>
						{!loading?
								<AlertDialogCancel>Close</AlertDialogCancel>
						:
		  <AlertDialogCancel onClick={handleCancel} disabled={!open}>
                Cancel
              </AlertDialogCancel>
						}
							</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</AlertContext.Provider>
	);
}

export function useAlertApi() {
	const context = useContext(AlertContext);
	if (!context) throw new Error('useAlertApi must be used inside AlertProvider');
	return context;
}
