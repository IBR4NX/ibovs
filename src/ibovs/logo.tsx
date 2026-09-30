import  * as React from 'react';
import { cn } from '@/shadcn/utils';
import { Spinner } from '@/ibovs/spinner';
import Image from 'next/image';
interface Props  {
	className?: string;
	size?: number;
	spinner?: boolean;
	logo?: boolean;
	full?: boolean;
}

export function Logo({
	className = '',
	full = false,
	spinner = false,
	logo = true,
	size = 70,
	...props
}: React.ComponentProps<'div'>& Props) {
	if (!spinner && !logo) return;
	return (
		<div className={full ? 'flex relative justify-center items-center h-screen' : ''}>
			<div
				className={cn(
					'relative flex overflow-hidden rounded-full  animate-[loading_3s_ease-in-out_infinite] ',
					className
				)}
				style={{ width: `${size}px`, height: `${size}px` }}
				{...props}
			>
				{logo && (
					<Image
						src='/favicons/logo/logo.png'
						alt='logo'
						width={size}
						height={size}
						className=' w-3/4 h-3/4 rounded-full  m-auto mb-1 animate-bounce'
					/>
				)}
				{spinner && <Spinner className='top-0 absolute stroke-ibovs-y' size={size} strokeWidth={3} />}
			</div>
		</div>
	);
}
export default Logo;