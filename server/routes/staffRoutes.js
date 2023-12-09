import express from 'express';
import { addStaff, deleteStaff, getStaff, getStaffPerformance} from '../controllers/staffController.js';

const router = express.Router();

router.post('/', addStaff);
router.get('/', getStaff);
router.delete('/:staffRollNumber', deleteStaff);
router.get('/performance', getStaffPerformance);


export default router;