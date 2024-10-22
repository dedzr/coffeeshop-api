
const { passwordConverter, comparePass } = require('../helpers');
const User=require('../models/users.schema');

function httpLoginController (req,res){

    console.log(req.session);

    return res.status(200).send("logged in");




    
}

async function httpRegistrationController(req,res)
{

    const userInfo=req.body;


    userInfo.pin=passwordConverter(userInfo.pin);

    

    try{
        const user=new User(userInfo);

        await user.save();
        return res.status(201).send("Created");


    }
    catch(e)
    {
        console.log(e);
        return res.status(500).send("error occured");
    }



}

async function httpLogoutController (req,res){

    if (req.user)
    {
        req.logout((err)=>{
            if(err)
                return res.status(400).send("cannot logout");
    
    
        });
    
        console.log(req.session);

        return res.status(200).send("logged out");

    }
    else
    {
        return res.status(400).send("you are not logged in");
    }
    

    
}

async function httpChangePinController(req,res)
{

    const {pin}=req.body;

    pinHashed=passwordConverter(pin);

    res.status(200);
    if(req.user)
    {

        if(comparePass(pin,req.user.pin))
        {
            return res.status(400).send("You have entered your existing pin");
        }
        try
        {

            await User.findOneAndUpdate({phoneNumber:req.user.phoneNumber},{pin:pinHashed});

            return res.status(200).send("pin updated");

        }
        catch(e)
        {
            console.log(e);
            return res.status(500).send("some error occured");
        }
        
    }
    else
    {
        return res.status(400).send("you are not logged in");
    }

}




module.exports={
    httpLoginController,
    httpRegistrationController,
    httpLogoutController,
    httpChangePinController


}