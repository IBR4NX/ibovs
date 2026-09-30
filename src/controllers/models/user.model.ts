
import mongoose, {Types, Document} from 'mongoose';
import { Status, Role } from './emun';
export interface IUser extends Document {
  id?:string;
  _id: Types.ObjectId;
  role: string;
  name?: string;
  email?: string;
  password?: string;
  status?: string;
  imgUrl?: string;
  isActive?: boolean;
  storeId?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new mongoose.Schema<IUser>(
  {   
    name: { type: String, required: [true," name is required"] },
    email: { type: String, required: [true," email is required"],
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
      unique: true,lowercase: true,trim: true,
    },
    role: { type: String,select:true,enum:Role ,default: "user", 
    },
    isActive: {type: Boolean,default: true},
    status:{ type: String, emun: Status, default: "active"
    },
    password: { type: String, required: [true," password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    imgUrl:{type: String,default:"/uploads/users/6abc3e11ea233bfe6ed9524a.jpg"
    },
    storeId: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Store', required:false,
    default: null 
  },]
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt',updatedAt: 'updatedAt'},
  }
);
schema.set("toJSON", {
  transform: function (_, ret) {
    const { _id,id,isActive,password, ...object }= ret
    // console.log(object);
    return object;
  },
});
schema.set("toObject", {
  transform: function (_, ret) {
    const { _id,createdAt, updatedAt, ...object }= ret
    object.id = _id.toString();
    // console.log(object);
    return object;
  },
});
schema.index({ _id: 1,email: 1, status: 1 });
export const userModel = mongoose.models.User || mongoose.model("User", schema); // 3  4
export default userModel;

// export default { schema,model:userModel} 
