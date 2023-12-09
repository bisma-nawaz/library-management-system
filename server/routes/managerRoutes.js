import express from 'express';
// import { addManager, deleteManager , getManager} from '../controllers/managerController.js';
import { getManager} from '../controllers/managerController.js';


const router = express.Router();

// router.post('/', addManager);
router.get('/', getManager);
// router.delete('/:id', deleteManager);

export default router;