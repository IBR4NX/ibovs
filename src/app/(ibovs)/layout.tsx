'use client';
import { motion, useScroll } from 'motion/react';
import React, { useState, useEffect, ReactNode } from 'react';
import { Header } from '@/components/shared/header';
import { SidebarProvider } from '@/components/ui/sidebar';
export default function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
  const { scrollYProgress}= useScroll()
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 0);

		return () => clearTimeout(timer);
	}, []);
	if (loading) return null;
	return (
		<>
		<SidebarProvider>

			<Header>
				<a href='#t'> top </a>
				<a href='#e'> end </a>
			
			
			</Header>
		
			<div className='fhlex relative h-[3000px]'>
			
				{children}
				
			</div>
		</SidebarProvider>
		</>
	);
}


