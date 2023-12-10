import Book from '../models/Book.js';

// add new book
export const addBook = async (req, res) => {
  const { bookISBN, bookTitle, bookAuthor, bookAvailability } = req.body;
  try {
    const newBook = new Book({  bookISBN, bookTitle, bookAuthor, bookAvailability });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get list of all the books 
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete the books: 
export const deleteBookByISBN = async (req, res) => {
    const { isbn } = req.params;
    try {
      const deletedBook = await Book.findOneAndDelete({ bookISBN: isbn });
      if (!deletedBook) {
        return res.status(404).json({ message: 'No book found with this ISBN' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // update book bt ISBN, note: isbn not editable
  export const updateBookByISBN = async (req, res) => {
      const { isbn } = req.params;
      const { bookTitle, bookAuthor, bookAvailability } = req.body;
    
      try {
        const updatedBook = await Book.findOneAndUpdate(
          { bookISBN: isbn },
          {
            bookTitle,
            bookAuthor,
            bookAvailability
          }, 
          { new: true }
        );
    
        if (!updatedBook) {
          return res.status(404).json({ message: 'No book found with this ISBN' });
        }
        res.status(200).json(updatedBook);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  };
  
// search a book by ISBN 
  export const searchBooksByISBN = async (req, res) => {
    try {
      // get isbn from the input query a.k.a searcb bar at backend 
      const isbn = req.query.isbn; 
      const book = await Book.findOne({ bookISBN: isbn });
  
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
