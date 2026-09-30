'use server'
import fs from "fs";
import path from "path";
export async function upload(file:File,name?:string,folder?:string|"/unknown") {
  const Type=file.name.split('.')
  const now = new Date().toISOString() 
  const n=`${name??now}.${Type[Type.length - 1]}`
  const f=`/uploads${folder?.startsWith('/')?folder:'/unknown'}`
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), `/public${f}`);
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
  const filePath = path.join(uploadsDir,n );
  fs.writeFileSync(filePath, buffer);
  const url=`${f}/${n}`
  return url
}