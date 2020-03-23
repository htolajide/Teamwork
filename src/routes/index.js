import express from 'express';

import validator from '../middlewares/validator';
import authenticator from '../middlewares/authenticator';
import users from '../controllers/users';
import product from '../controllers/product';


const router = express.Router();

// user auth
router.post('/auth/create-user', validator.auth,  users.signup);
router.post('/auth/signin', validator.auth, users.login);
router.get('/traders/all', users.getAll);
router.get('/traders/count',  users.getCount);
router.put('/auth/update', authenticator, validator.auth, users.editTrader);
router.put('/auth/password/change', validator.auth, users.changePassword);
 
// Create product
router.post('/product', authenticator, product.create);
router.get('/product/all', product.getAll);
router.get('/product/:productId',  product.getOne);
// Delete a product
router.delete('/product/:productId', authenticator, validator.checkProductIdParams, product.delete);

export default router;
