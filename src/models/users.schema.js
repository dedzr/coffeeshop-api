const mongoose=require('mongoose');


const userSchema=new mongoose.Schema(
    {
        phoneNumber:{
            type: String,
            required:true,
            unique:true,
        },
        pin:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            required:true,
        },
      
    },
    {
        timestamps:true,
    }
);



module.exports=mongoose.model("Users",userSchema);