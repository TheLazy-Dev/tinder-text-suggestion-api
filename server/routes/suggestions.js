import express from 'express';
import * as suggestionController from '../controllers/suggestionController';

const router = express.Router();

/* GET all users */
router.post('/', suggestionController.postScreenshot);

export default router;
