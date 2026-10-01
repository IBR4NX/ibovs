// import {findStoreByOwner } from '@/repositories/store.repository'
'use server'
import  {Types} from 'mongoose';
import  {  StoreModel, IStore} from "@/controllers/models/store.model";
import { connectDB } from "@/lib/connectDB";

export async function createStore(data:object) {
  await connectDB()
  const newStore= new StoreModel(data);
  const error =  newStore.validateSync();
  if(error)return {error,store:null} 
  const store = await newStore.save()
  return {error:null, store}
}
// Bring a user by email : Promise<IUser | null>
export async function findStoreByOwner(owner?: string) {
  if (!owner) return null;
  await connectDB()
  const user = await StoreModel.findOne({ owner: owner.toLowerCase() }).lean();
  return user
}

export async function findStoreById(id?:string) {
  if (!id) return null;
  await connectDB()
  const store= await StoreModel.findById(id).populate('owner');
  return store
}
export async function  findStoreBySlug(slug:string) {
  await connectDB()
  return await StoreModel.findOne({ slug });
 // const {name ,owner,location,description,...rest}= await StoreModel.findById(store._id);
}
export async function updateStore(id:string,data:object) {
  await connectDB()
  return await StoreModel.findByIdAndUpdate(id,data);
}
export async function findAllStoreByOwner(owner:string) {
  await connectDB()
  return await StoreModel.find({owner}).lean();
  
}
export async function findAllStore() {
  await connectDB()
  return await StoreModel.find();
  
}