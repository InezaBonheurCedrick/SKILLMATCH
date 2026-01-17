import express from 'express';
import { 
  submitApplication, 
  getAllApplications, 
  updateApplicationStatus 
} from '../controllers/applicationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/submit', submitApplication);

router.use(protect);
router.get('/', getAllApplications);
router.patch('/:id/status', updateApplicationStatus);

export default router;