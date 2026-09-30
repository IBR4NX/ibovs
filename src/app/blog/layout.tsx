'use client';
import { useState, useEffect, ReactNode } from 'react';
import { Header } from '@/components/shared/header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarProvider
} from "@/components/ui/sidebar"
export default function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 0);
		return () => clearTimeout(timer);
	}, []);
	if (loading) return null;
	return (
		<>
		<SidebarProvider>
				<Sidebar className=" " dir="rtl" side="right"  collapsible="offcanvas" >
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
			<Header>
			<a href="#t"> top </a>
			<a href="#e"> end </a>
			</Header>
			tttgvbbhhh
			{children}
		</SidebarProvider>
		</>
	);
}
