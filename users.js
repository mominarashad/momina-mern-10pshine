const mongoose=require('mongoose')
const schema=mongoose.Schema;

const schemaCreation=new schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true
  }

})

const userModel=mongoose.model("user",schemaCreation)
module.exports=userModel;