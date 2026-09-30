
import { NextResponse, NextRequest} from "next/server"
import { redirect } from "next/navigation";
import { getVerifiedPayload } from "@/lib/auth/authUtils";
import { register,getStore,findAllStoreByOwner,updateStore } from "@/controllers/store.controller";
import { setAuthCookies } from "@/lib/auth";
export async function POST(req:Request) {
    const session = await getVerifiedPayload();
    const body = await req.json();
    const data={owner:session.id ,
    name:body.name ,
    slug:body.slug ,
    bio:body.description };
    try {
    const {user,store}= await register(data);
      console.log(user);
      console.log(store);
     await setAuthCookies(user)
    } catch (err) {
      console.error('Error:', err);
    return NextResponse.json({error:err},{status:400});
    }
    redirect('/dashboard')
   return NextResponse.redirect(new URL('/dashboard', req.url));
 
}

export async function GET(req:Request) {
  const session = await getVerifiedPayload();
 // const user = await findUserById(session.id)
    const data= await findAllStoreByOwner(session?.id);
    //const data = dataStore[0]
    //console.log(data)
    return Response.json(data);
}
export async function PUT(req: NextRequest) {
  const session = await getVerifiedPayload();
  const keysToKeep = ["name", "bio", "slug", "imgUrl"];
  const data = await req.json();
  const filteredUser = Object.fromEntries(
    Object.entries(data).filter(([key]) => keysToKeep.includes(key))
  );
  console.log(filteredUser);
  const updated = await updateStore(session.storeId, filteredUser);
  console.log(updated);
  if (!updated) return NextResponse.json({ error: "Store not found" });
  return NextResponse.json({ message: "successful updated" });
}