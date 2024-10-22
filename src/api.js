const authRouter = require('./routes/auth.route');
const productsRouter = require('./routes/products.route');

const apiRouter=require('express').Router();





apiRouter.use('/products',productsRouter);
apiRouter.use('/auth',authRouter);







module.exports=apiRouter;