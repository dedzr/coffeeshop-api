const mongoose=require('mongoose');


mongoose.connection.once('open',()=>{

    console.log(`connected to MONGODB database`);
});

mongoose.connection.on('error',(err)=>{

    console.log(err);

})


async function mongoConnect()
{
    const MONGO_URL='mongodb://localhost/coffeshop';
    await mongoose.connect(MONGO_URL);

}


module.exports={mongoConnect};