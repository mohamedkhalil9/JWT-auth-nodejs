import express from 'express';
import { getUsers, getUser, deleteUser, getCurrentUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js'
import allowedTo from '../middlewares/allowedTo.js'
import { idValidator } from '../validation/validators.js';

const router = express.Router();

router.get('/current', verifyToken, getCurrentUser) 

router.route('/').get(verifyToken, allowedTo('manager', 'admin'), getUsers)
router.route('/:id')
  .get(verifyToken, allowedTo('manager', 'admin'), idValidator, getUser)
  .delete(verifyToken, allowedTo('admin'), idValidator, deleteUser)

export default router;
