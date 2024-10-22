

const { httpGetProducts, httpAddProduct, httpDeleteProduct, httpUpdateProduct } = require('../controllers/product.controller');

const productsRouter=require('express').Router();



productsRouter.get('/',httpGetProducts);

productsRouter.post('/',httpAddProduct);

productsRouter.delete('/:id',httpDeleteProduct);

productsRouter.patch('/:id',httpUpdateProduct);








module.exports=productsRouter;