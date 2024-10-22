const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({

    products:[{type:Object,required:true}],

    













},
{
    timestamps:true,
}

);


module.exports=mongoose.model('Orders',orderSchema);