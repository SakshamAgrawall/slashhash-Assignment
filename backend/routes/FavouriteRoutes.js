import express from 'express';
import { create, get } from '../controllers/FavouriteController.js'

const router = express.Router();

router.post('/post', create)
router.get('/get', get)

export default router;