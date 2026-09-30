// import { createUser, findUserByEmail } from '@/repositories/user.repository.ts'
'use server'
import mongoose, {Types,ObjectId} from 'mongoose';
import userModel, { IUser } from '@/controllers/models/user.model';
import { connectDB } from "@/lib/connectDB";
export async function createUser(name:string,email:string, password:string) {
  await connectDB()
  const newUser = new userModel({name, email, password});
  const error = newUser.validateSync();
  console.log("user.repository:41 :", newUser);
  if(error)return {error,user:null} 
  const user = await newUser.save()
  return {error:null, user}
}

// Bring a user by email : Promise<IUser | null>
export async function findUserByEmail(email: string) {
  await connectDB()
  //await userModel.deleteMany({}) //await storeModel.deleteMany({})
  const user = await userModel.findOne({ email: email.toLowerCase() });
  console.log("############################");
  if(!user)return null
  //const obj= user.toJSON(); //delete obj.createdAt //console.log( obj);
  console.log("############################")
  user.id=user._id.toString()
  return user
}
import { colors } from "@/utils/colors"
const keywords = ["before", "start", "begin"];
const _logTime = (value?:string)=>{
  const v = value?.toLowerCase();
  const isStart = keywords.some(w => v.startsWith(w));
  const now= new Date().toLocaleTimeString();
  const m = value// isStart?"Start Time":"End Time"
  if (isStart) {
    console.log(colors.green(`➜  ${m}`),colors.bold(` : `),now);
  }else{
    console.log(colors.yellow(`➜  ${m}`),colors.bold(` : `),now);
  }
  return now
}
// جلب مستخدم واحد بالـ id
export async function getUserById(id: string): Promise<IUser | null> {
  if(!Types.ObjectId.isValid(id)) return null 
  _logTime("before connectDB")
  await connectDB();
  _logTime("after connectDB")
  const user= await userModel.findById(id);
  return user
}
export async function findUserById(id: string): Promise<IUser | null> {
  await connectDB()
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const user =await userModel.findById(id).populate('storeId','name slug imgUrl bio');
  user.id=user._id.toString();
  const data= user.toJSON()
  console.log(data);
  return user
}
export async function updateUser(id:string,data:object) {
  await connectDB()
  return await userModel.findByIdAndUpdate(id,data);
}
// جلب جميع المستخدمين
export async function findAllUsers(): Promise<IUser[]> {
  await connectDB()
  return userModel.find().lean();
}
export async function deleteUserById(id: string): Promise<IUser | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return userModel.findByIdAndDelete(id);
}