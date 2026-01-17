import express from 'express';
import { signup, signin, changePassword, logout } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);

router.use(protect); 
router.patch('/change-password', changePassword);

export default router;