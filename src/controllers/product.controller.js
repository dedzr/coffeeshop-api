const Product = require('../models/products.schema');


async function httpGetProducts (req,res){

    try{
        const products=await Product.find({},{__v:0,createdAt:0,updatedAt:0});

        return res.status(200).json(products);

    }
    catch(e)
    {
        console.log(e);

        return res.status(500).json({error:"error occured"});
    }

}


async function httpAddProduct (req,res){

    const user=req.user;

    const productInfo=req.body;

    if(user && user.isAdmin)
    {
        const user=new Product(productInfo);

        try{
            await user.save();

            return  res.status(201).send("product created");

        }
        catch(e)
        {
            console.log(e);

            return res.status(500).json({error:"could not create the product"});
        }

        

    }
    else
    {
        return res.status(400).send('you are not logged in or you are not admin');
    }
  
    
}

async function httpDeleteProduct(req,res){

    const {params:{id}}=req;

    

    const user=req.user;

    

    if(user && user.isAdmin)
        {

            try{
                const product=await Product.findById(id);

                if(!product)
                {
                    return res.status(200).send("no such product");
                }

                await Product.deleteOne(product);
               

                
                return res.status(200).send("deleted");
                
            }
            catch(e)
            {
                console.log(e);
                return res.status(500).send("error occured");
            }
            
          
            
    
        }
        else
        {
            return res.status(400).send('you are not logged in or you are not admin');
        }


}

async function httpUpdateProduct(req,res){

    const {params:{id}}=req;
    const productInfo=req.body;

    const user=req.user;


    if(user && user.isAdmin)
        {

            try{
                const product=await Product.findById(id);

                console.log(product);
                await Product.updateOne(product,productInfo,{upsert:true});

                if(!product)
                {
                    return res.status(200).send("no such product");
                }

                return res.status(200).send("updated");
                
            }
            catch(e)
            {
                console.log(e);
                return res.status(500).send("error occured");
            }
            
          
            
    
        }
        else
        {
            return res.status(400).send('you are not logged in or you are not admin');
        }


}


module.exports={
    httpGetProducts,
    httpAddProduct,
    httpDeleteProduct,
    httpUpdateProduct

}