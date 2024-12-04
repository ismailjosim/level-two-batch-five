import express from 'express';
import { BookControllers } from './book.controller';

const router = express.Router();

// Define books routes
router.get('/', BookControllers.getAllBooks);
router.post('/create-product', BookControllers.createBook);

export const BookRoutes = router;
