'use server'
// import 'server-only';
import { FormState } from '@/lib/definitions'
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/envConfig';
import { cache } from 'react'
import { revalidatePath } from 'next/cache';
import { findUserById, updateUser } from '@/controllers/repositories/user.repository';
import { checkAuth } from '@/lib/auth';
export const myProyfile = cache(async () => {
  const session = await checkAuth();
  const data = await findUserById(session?.id)
  if (data) {
    const user = {
      name: data.name,
      email: data.email,
      imgUrl: data.imgUrl,
      id:data._id
    }
    console.log(data)
    return user
  } else {
    redirect('/login')
  }

})

export async function updateProfile(state: FormState, formData: FormData): Promise<FormState> {
  const session = await checkAuth()

  // formData.forEach((value, key) => {
  //   console.log(key, value)
  // })
  const dataUser = {
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username')
  }
  const userup = await updateUser(session?.id, dataUser)
  if (!userup) {
    return {
      success: false,
      message: "Failed to update user profile",
    }
  }
  redirect('/dashboard')

}
export async function updateAvatar(state: FormState, formData: FormData) {
  const session = await checkAuth()
  const avatar = formData.get('avatar') as File
  console.log(avatar)
  if (avatar.size) {
    console.log("noooooooooo", avatar.name)
    const fileName = `${session?.id}`;
    const { data: uploadData, error } = await supabase.storage
      .from("Ibovs")
      .upload(fileName, avatar, {
        cacheControl: '3600',
        upsert: true,
      });
    const { data } = supabase.storage
      .from("Ibovs")
      .getPublicUrl(fileName);
    const userup = await updateUser(session?.id, { avatar: data.publicUrl })
    if (!userup) {
      return {
        success: false,
        message: "Failed to update user profile",
      }
    }
  }
}
