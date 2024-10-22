const passport=require('passport');

const {Strategy}=require('passport-local');

const { comparePass } = require('../helpers');

const User =require('../models/users.schema');


passport.serializeUser((user,done)=>{

    
    done(null,user.phoneNumber);
    
})
passport.deserializeUser( async (phoneNumber,done)=>{

    const dbUser=await User.findOne({phoneNumber:phoneNumber});

    if(dbUser)
        done(null,dbUser);


});


const strategy=new Strategy({usernameField:"phoneNumber",passwordField:"pin"}, async (phoneNumber,pin,done)=>{
    
    try{
        const dbUser=await User.findOne({phoneNumber:phoneNumber});

        
       
        if(!dbUser || !comparePass(pin,dbUser.pin))
        {
            throw new Error("Invalid crendentials");
            

        }
        else
        {
            done(null,dbUser);
        }

       

    }
    catch(e)
    {
        done(e,null);

    }
    

});



passport.use(strategy);
