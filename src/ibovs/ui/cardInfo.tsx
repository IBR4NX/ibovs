import React, { useState, memo} from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ImageForm from "@/components/shared/form/image-form";
import { DialogForm } from "@/components/shared/form";
import { DialogPassword } from "@/components/shared/dialog";
import useSWR from "swr";
import { FormItem } from "@/components/shared/form";


type ProfileData = {
	imgUrl?: string;
	name?: string;
	email?: string;
	role?: string;
	data?: FormItem[];
	edit: FormItem[];
};

type ProfileProps = {
	data: ProfileData;
	url: string;
};

const Profile = memo(function Profile({ data, url }: ProfileProps) {
	const [open, setOpen] = useState(false);
	const [openPassword, setOpenPassword] = useState(false);
	if (!data) return null;
	return (
		<>
			<Card className='rounded-2xl shadow-sm' dir='rtl'>
				<CardHeader className='flex flex-col items-center gap-4'>
					{data.imgUrl && (
						<ImageForm avatar={data.imgUrl}>
							<Avatar className='size-32 w-h-8'>
								<AvatarImage src={data.imgUrl} />
								<AvatarFallback></AvatarFallback>
							</Avatar>
						</ImageForm>
					)}
					{data && (
						<div className='text-center'>
							<CardTitle className='text-xl'>{data.name}</CardTitle>
							<CardDescription className=''>{data?.email}</CardDescription>
						</div>
					)}
					{data.role && <Badge>{data.role}</Badge>}
				</CardHeader>

				<Separator />
				<CardContent className='space-y-4 pt-6'>
					{data.data?.map(i => (
						<Item key={i.key} className='flex justify-between'>
							<ItemMedia>{i.name}</ItemMedia>
							<ItemContent>
								<ItemTitle>{i.value}</ItemTitle>
							</ItemContent>
						</Item>
					))}
				</CardContent>
				<CardFooter>
					<div className=' flex gap-4 pt-2'>
					<Button className='' variant='outline' onClick={() => setOpen(!open)}>
						Edit Informtion
					</Button>
					<DialogForm data={data.edit} open={open} setOpen={setOpen} url={url}  onOpenChange={function (open: boolean): void {
							// throw new Error("Function not implemented.");
						} } />
					<DialogPassword />
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
)
export default Profile;