import express from 'express';
import { getDashboardStats, getRecentOpportunities } from '../controllers/dashboardController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect); 
router.get('/stats', getDashboardStats);
router.get('/recent-opportunities', getRecentOpportunities);

export default router;