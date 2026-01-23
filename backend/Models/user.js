import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema =  new Schema({
    name : {
        type :String,
        required : true
    },
    email :
    {
        type :String ,
        required : true,
    },
    password:
    {
        type: String,
        required : true
    }
    ,   
      role: {
    type: String,
    enum: ["user", "admin", "parent"],
    default: "user",
    required: true
  }
});


export default mongoose.model('users',UserSchema);