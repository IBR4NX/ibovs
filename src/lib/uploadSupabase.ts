'use server'
import { supabase } from "./envConfig";

export async function uploadImg(state:string,formData:FormData) {
  console.log(formData.get('name'))
  console.log(formData.get('img'))
    const fileName = `${formData.get('name')}`;
    const { data:d, error } = await supabase.storage.from('Ibovs').upload(fileName, formData.get('img') as File,
  {
    cacheControl: '3600',
    upsert: true
  });
    if (error) throw error;
    // return data;
    const { data } = supabase.storage
      .from("Ibovs")
      .getPublicUrl(fileName);
      return data.publicUrl

}
export async function uploadFile(path:string,file:File) {
  
    const fileName = `${path}`;
    const { data:d, error } = await supabase.storage.from('Ibovs').upload(fileName,file,
      {
        cacheControl: '3600',
        upsert: true
      }
    );
    if (error) throw error;
    // return data;
    const { data } =await supabase.storage
      .from("Ibovs")
      .getPublicUrl(fileName);
      return data.publicUrl
}