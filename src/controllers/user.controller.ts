// src@/controllers/user.controller.ts
"use server"
 import { createUser, findUserByEmail,
  findAllUsers,  findUserById,getUserById ,updateUser,deleteUserById } from '@/controllers/repositories/user.repository'
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/envConfig';
import { getFailed } from '@/services/Helper';
// GET /api/users
export async function getUsers() {
  const users = await findAllUsers();
  return (users);
}

// GET /api/users/:id
export async function getUser(id: string) {
  const user = await findUserById(id);
  if (!user) return getFailed(false, undefined, 'User not found');
  return (user);
}
getUser
export async function signup(name:string,email:string, password:string) {
  const existingUser = await findUserByEmail(email);
  if (existingUser)throw new Error(' email of user already exists');
  
  const passwordHash = await bcrypt.hash(password, 10);
  const {error, user} = await createUser( name, email, passwordHash);
  
  if (error)throw new Error(error);
  console.log("Signup successful");
  return user
}

export async function login(email:string, password:string) {
  const existingUser = await findUserByEmail(email);
  if (!existingUser || !existingUser.password)throw new Error(' email is not exists');
  console.log(existingUser);
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch)throw new Error('Invalid email or password. Please try again.');
  
  console.log("Login successful",existingUser._id);
  return existingUser;
}
export async function updatePassword(id:string,data:{password:string,new:string}){
  const user = await getUserById(id);
  console.log(data,user)
  if(!user)throw new Error('User not found')
  const passwordMatch = await bcrypt.compare(data.password , user.password as string );
 if (!passwordMatch)throw new Error('Current password is incorrect.');
  const password = await bcrypt.hash(data.new, 10);
  user.password=password;
  user.save();
  return user
}
export async function logout() {
  redirect('/')
}
export async function updateAvatar(id:string, file:File) {
  const avatar = file
  console.log(avatar, id)
  if (avatar.size) {
    console.log("noooooooooo", avatar.name)
    const fileName = `${id}`;
    const { data: uploadData, error } = await supabase.storage
      .from("Ibovs")
      .upload(fileName, avatar, {
        cacheControl: '3600',
        upsert: true,
      });
      console.log(uploadData,error)
    const { data } = supabase.storage
      .from("Ibovs")
      .getPublicUrl(fileName);
    const userup = await updateUser(id, { avatar: data.publicUrl })
    if (!userup) {
      throw new Error('Failed to update user profile');
    }
    return userup
  }
}

export {updateUser,deleteUserById}