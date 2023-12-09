import express from 'express';
import { addService, getServices } from '../controllers/ServiceController.js';

const router = express.Router();

router.post('/', addService);
router.get('/', getServices);

export default router;