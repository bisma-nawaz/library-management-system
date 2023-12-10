import express from 'express';
import {
  addBook,
  getBooks,
  deleteBookByISBN,
  updateBookByISBN,
  searchBooksByISBN
} from '../controllers/bookController.js';

import {
  checkOutBookByISBN,
  returnBookByISBN
} from '../controllers/transactionController.js';

const router = express.Router();


// Define your routes here
router.post('/', addBook);
router.get('/', getBooks);
router.delete('/:isbn', deleteBookByISBN);
router.put('/:isbn', updateBookByISBN);
router.get('/search', searchBooksByISBN);
router.put('/checkout/:isbn/:studentId/:staffId', checkOutBookByISBN);
router.put('/return/:isbn', returnBookByISBN);

export default router; 