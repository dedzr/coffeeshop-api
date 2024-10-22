const bcrypt=require('bcrypt');


const SALT_ROUNDS=10;

const passwordConverter= (password)=>{

    const salt=bcrypt.genSaltSync(SALT_ROUNDS);
    
    return bcrypt.hashSync(password,salt);

    
};

const comparePass= (password,hashPass)=>{

    return bcrypt.compareSync(password,hashPass);



};

module.exports={
    passwordConverter,
    comparePass
}