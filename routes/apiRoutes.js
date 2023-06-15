const express = require('express');
// Rutas de productos
const productsController = require("../controllers/productsController");
const providerController = require("../controllers/providersController");
const apiRouter = express.Router();


apiRouter.get('/providers', providerController.getAllProviders);
apiRouter.get('/products/:company_name', productsController.findProductFromProvider);
apiRouter.get('/:id?', productsController.getOneProduct);
apiRouter.post('/products', productsController.createProduct);
apiRouter.post('/providers', providerController.createProvider);

module.exports = apiRouter;