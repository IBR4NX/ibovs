'use server'
import 'server-only'
import  {StoreModel as storeModel, IStore} from "@/controllers/models/store.model";
import  {  userModel} from "@/controllers/models/user.model";
import { createStore, findStoreByOwner,findStoreById, findAllStoreByOwner,updateStore } from '@/controllers/repositories/store.repository'
import { checkAuth } from '@/lib/auth/authUtils';
export async function checkSlug(slugCheck:any) {
  const slug = slugCheck.toLowerCase().trim();
  const slugExists = await storeModel.exists({ slug });
  return slugExists
}
//    create store by owner
  //const test =await store.collection.dropIndex("owner_1");
export async function register(data:IStore) {
  const slug = data.slug.toLowerCase().trim();
  const slugExists = await storeModel.exists({ slug });
  if (slugExists) {
    userModel
    throw new Error('Slug already exists plase modfiy slug ');
    }
  const storesCount = await storeModel.countDocuments({ owner: data.owner });
  const user = await userModel.findById(data.owner);
  if(user.storeId.length>=3)
  if (storesCount>=3) {
    throw new Error('Owner can only create up to 3 stores');
    }
   const {error,store} = await createStore(data)
   if(error)throw new Error(error)
   user.storeId.push(store?._id)
   user.role="seller"
   await user.save()
  return {user,store}
}

export async function getAllStores() {
  const session = await checkAuth();
  const store = await findStoreById(session.storeId)
  const stores = await findAllStoreByOwner(session.id)
  // const data= {store:await serialize(store),stores:await serialize(stores)}
  return {stores,store}
}
export async function loginOwner() {
  const session = await checkAuth();
  const store = await findStoreByOwner(sessione?.id);
  // const result = await setAuthStore(store);
  // redirect("/dashboard");
  return store
}

export async function getStore(id:string){
  const user = await findStoreByOwner(id)
 // console.log(user);
  
   return user
}
export {updateStore,findAllStoreByOwner}