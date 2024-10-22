const passport=require('passport');

const { httpLoginController, httpRegistrationController,httpLogoutController,httpChangePinController } = require('../controllers/auth.controller');


const authRouter=require('express').Router();




authRouter.post('/login', passport.authenticate('local'),httpLoginController);

authRouter.post('/registration',httpRegistrationController);

authRouter.delete('/logout',httpLogoutController);

authRouter.post('/changePin',httpChangePinController);






module.exports=authRouter;