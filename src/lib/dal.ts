import 'server-only'
import { redirect } from 'next/navigation'

import userModel, { IUser } from '@/controllers/models/user.model';
import { findStoreByOwner } from '@/controllers/repositories/store.repository';
import { verifyAuthStore, verifyAuthUser } from '@/lib/auth';
export async function getUserDataFlow(user:IUser) {
 const {_id:id, name, email, role, password, imgUrl, ...data }= await user
 return {id, name, email, role, imgUrl}
}
export async function getUserDataFlowAdmin(user:IUser) {
 const {_id:id, name, email, role, password, imgUrl, ...data }= await user
 return {id, name, email, role, imgUrl}
}

export async function getUDFLvlOne(user:IUser) {
 const {_id:id, name, email, role, ...data }= await user
 return {id, name, email, role}
 
}

export async function getStoreAndProfile(){
  const session= await verifyAuthUser();
  const sessionStore= await verifyAuthStore();
  if(!session.is)redirect('/');
  console.log(session)
  const store= await findStoreByOwner(session._id)
  if(!store)redirect('/')
  if(session?.role==="user")redirect('/')
  return {data:
    {
      name:store.name,
      description:store.description,
      phone:store.phone,
      address:store.address,
      slug:store.slug,
      logo:store.logo
    },
    user:{
      name:store?.owner?.name,
      email:store?.owner?.email,
      avatar:store?.owner?.avatar,
      role:store?.owner?.role
    }
  }
}
