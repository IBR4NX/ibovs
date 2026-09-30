import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2Icon } from "lucide-react";
import { uploadForm } from "@/utils/uploadForm";
import { useDialogApi } from "./dialogProvider";
interface Props {
  children: React.ReactNode;
  url: string;
  title?: string;
  description?: string;
  avatar:string
}

const ImageForm = ({ children, url,avatar }: Props) => {
  const [imagePreview, setImagePreview] = React.useState<string | null>(avatar);
  const [file, setFile] = React.useState<File | null>(null);
  const {dialogApi}= useDialogApi()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file)
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const myHeaders = new Headers();
  console.log(myHeaders);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    console.log("buff")
//  const buffer=await Buffer.from(await file.arrayBuffer())
//  console.log(buffer)

    const formData = new FormData();
    formData.append("file", file);
    console.log(typeof formData)
  const res= await dialogApi('/api/upload',"POST", formData);
  navigator.clipboard.writeText("ibovs")
    console.log(res);
    //const data = await res.json();
   // console.log(data); 
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className=" -2">{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>رفع الصورة</DialogTitle>
            <DialogDescription>
              لرفع صورة جديدة اضغط على الصورة لاختيار صورة جديدة
            </DialogDescription>
          </DialogHeader>
          <form
            className="items-center px-10"
            onSubmit={handleSubmit}
          >
            <Avatar className=" size-52 m-auto mb-5">
              <Label htmlFor="image">
                <AvatarImage src={imagePreview ?? undefined} />
              </Label>
              <Input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className=" absolute size-full opacity-0 text-wrap z-10 bg-red-500 rounded-full"
                onChange={handleImageChange}
                
              />
              <AvatarFallback>اضافة الصورة</AvatarFallback>
            </Avatar>
            {imagePreview&&
              
            <Button type="submit" className="w-full">
              رفع الصورة
            </Button>
            }
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageForm;
