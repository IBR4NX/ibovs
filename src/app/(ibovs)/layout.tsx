'use client';
import { useState, useEffect, ReactNode,useRef } from 'react';
import { Header } from '@/components/shared/header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarProvider
} from "@/components/ui/sidebar"
import Motion from '@/components/animation/motion';
export default function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const [loading, setLoading] = useState(true);
	const constraintsRef = useRef(null);
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 0);
		return () => clearTimeout(timer);
	}, []);
	if (loading) return null;
	
	return (
		<>
		<SidebarProvider className="h-screen w-screen   mt-13 overflow-hidden ">
			<Header>
			<a href="#t"> top </a>
			<a href="#e"> end </a>
			</Header>
				<Sidebar dir="rtl" side="right"  collapsible="offcanvas" >
				  <SidebarHeader>
					{/* <NavUser user={store} /> */}
				  </SidebarHeader>
					{/* <Separator orientation="horizontal" /> */}
				  <SidebarContent>
				  </SidebarContent>
				  <SidebarFooter>
					{/* <SidebarOptInForm/> */}
				  </SidebarFooter>
				  <SidebarRail />
				</Sidebar>
			<div
			ref={constraintsRef}
			className=" fixed bg-muted/50 items-center justify-center p-2 p-8 w-full h-full overflow-hidden scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-gray-400/10">
				{constraintsRef && <Motion constraintsRef={constraintsRef} />}
			</div>
		</SidebarProvider>
		</>
	);
}
