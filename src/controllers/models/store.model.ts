
import mongoose, {Types, Document} from 'mongoose';
import { Status } from './emun';
//    Name
export interface IStore {
  owner: Types.ObjectId;
  name?: string;
  slug: string;
  bio?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  analytics?: {
    views: number;
    totalSales: number;
  };
  status?: string;
  imgUrl?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
//    Name
const schema = new mongoose.Schema<IStore>(
  {
    owner: {type: Types.ObjectId,ref: "User",required: true},
    name: {type: String,trim: true,required: true,minlength: 3,maxlength: 100},
    slug: {type: String,required: true,unique: true,lowercase: true,trim: true
    },
    bio: {type: String,maxlength: 500,
    },
    location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
  },
  analytics: {
    views: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 }
  },
  status: { 
    type: String, 
    enum: Status, 
    default: 'active' 
  },
    isActive: {type: Boolean,default: true},
    imgUrl: {type: String, default:'http://localhost:3000/favicons/favicon-96x96.png'},
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt',updatedAt: 'updatedAt'},
  }
);
schema.set("toJSON", {
  transform: function (_, ret) {
    const { _id, ...json }= ret
    // console.log(json);
    return json;
  },
});
schema.set("toObject", {
  transform: function (_, ret) {
    const { _id,createdAt, updatedAt, ...object }= ret
    // object._id = _id.toString();
    // console.log(object);
    return object;
  },
});
schema.index({ _id: 1,owner: 1,link: 1, isActive: 1 });
export const StoreModel = mongoose.models.Store || mongoose.model("Store", schema); // 3  4

export default { schema,model:StoreModel} 
