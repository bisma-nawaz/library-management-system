import express from 'express';
import { submitFeedback, 
    getFeedback, 
    getFeedbackByService, 
    getFeedbackForManager 
} from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', submitFeedback);
router.get('/', getFeedback);
router.get('/:serviceName', getFeedbackByService);
router.get('/manager', getFeedbackForManager);


export default router;
