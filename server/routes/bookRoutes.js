import express from 'express';
import {
  addBook,
  getBooks,
  deleteBookByISBN,
  updateBookByISBN,
  searchBooksByISBN
} from '../controllers/bookController.js';

const router = express.Router();


// Define your routes here
router.post('/', addBook);
router.get('/', getBooks);
router.delete('/:isbn', deleteBookByISBN);
router.put('/:isbn', updateBookByISBN);
router.get('/search', searchBooksByISBN);

export default router; 