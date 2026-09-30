import { NextRequest, NextResponse } from "next/server";

import { checkAuth } from "@/lib/auth";
import { updateUser} from "@/controllers/user.controller";
import { upload } from "@/services/uploads";

 
export async function POST(req: NextRequest) {
  console.log(req)
  // console.log(await req.json());
  const data = await req.formData(); // متاح في Next.js 14+
  const file = data.get("file") as File;
  const token = await checkAuth();
  const upfile= await upload(file,token.id,"/users")
  console.log(upfile);
  if(upfile){
    const result = await updateUser(token.id,{imgUrl:upfile});
   const data= result.toJSON()
   console.log(data);
  return NextResponse.json({ path: upfile,data });
  }
  return NextResponse.json({message:"noooooo"})
}