const mongoo=require('mongoose')
const schema= mongoo.Schema;

const createSchema=new schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const User=mongoo.model("users",createSchema)



module.exports=User;
