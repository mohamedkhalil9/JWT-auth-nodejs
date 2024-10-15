import express from 'express';
import { getUsers, getUser, deleteUser, getCurrentUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js'
import allowedTo from '../middlewares/allowedTo.js'

const router = express.Router();

router.get('/current', verifyToken, getCurrentUser) 

router.route('/').get(verifyToken, allowedTo('manager', 'admin'), getUsers)
router.route('/:id')
  .get(verifyToken, allowedTo('manager', 'admin'), getUser)
  .delete(verifyToken, allowedTo('admin'), deleteUser)

export default router;
