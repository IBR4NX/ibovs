"use client";

import { useEffect, useId, useState, useMemo, use } from "react";
import CardInfo from "@/ibovs/ui/cardInfo";
type User = {
	name: string;
	email: string;
	imgUrl?: string;
	role?: string;
};
import convertData from "@/services/convertData";
import useSWR, { useSWRConfig } from "swr";
import { DialogProvider } from "@/ibovs/ui/dialogProvider";
export default function AccountPage() {
	const { data: user } = useSWR("/user");
	const con = useSWRConfig();
	const now = new Date()
	const data = useMemo(() => {
		console.log("calculate");
		return user ? convertData(user) ?? {} : {};
	}, [user]);
	console.log("uuid: ",now)
	console.log("data: ",user)

	return (
		<DialogProvider>
		<div className='max-w-2xl mx-auto py-10 px-4'>
			{/* {user ? (
				<CardInfo data={data} url='/user' />
			) : (
				<p className='text-muted-foreground'>No user data found.</p>
			)} */}
		</div>
		</DialogProvider>
	);
}