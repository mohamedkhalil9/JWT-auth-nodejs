import express from 'express';
import { getUsers, getUser, deleteUser, updateUser, getCurrentUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js'
import allowedTo from '../middlewares/allowedTo.js'
import { idValidator } from '../validation/validators.js';

const router = express.Router();

router.use(verifyToken)
router.get('/current', getCurrentUser) 

router.route('/').get(allowedTo('manager', 'admin'), getUsers)
router.route('/:id')
  .get(allowedTo('manager', 'admin'), idValidator, getUser)
  .delete(allowedTo('admin'), idValidator, deleteUser)
  .patch(allowedTo('admin'), idValidator, updateUser)

export default router;
