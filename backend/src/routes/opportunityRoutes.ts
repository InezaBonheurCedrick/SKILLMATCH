import express from 'express';
import { 
  getAllOpportunities, 
  createOpportunity, 
  getOpportunity, 
  updateOpportunity, 
  deleteOpportunity 
} from '../controllers/opportunityController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getAllOpportunities)
  .post(protect, createOpportunity);

router.route('/:id')
  .get(getOpportunity)
  .patch(protect, updateOpportunity)
  .delete(protect, deleteOpportunity);

export default router;