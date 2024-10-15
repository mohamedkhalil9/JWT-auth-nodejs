import express from 'express';
import { getUsers, getUser, deleteUser, getCurrentUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router();

router.get('/current', verifyToken, getCurrentUser) 

router.route('/').get(verifyToken, getUsers)
router.route('/:id').get(getUser).delete(deleteUser)

export default router;
