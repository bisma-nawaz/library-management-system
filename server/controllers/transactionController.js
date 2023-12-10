import Book from '../models/Book.js';
import Checkout from '../models/Checkout.js';
import Staff from '../models/Staff.js';

  // Check out a book by ISBN
//   export const checkOutBookByISBN = async (req, res) => {
//     const { isbn, studentId } = req.params;
  
//     try {
//       const book = await Book.findOne({ bookISBN: isbn });
  
//       if (!book) {
//         return res.status(404).json({ message: 'Book not found' });
//       }
  
//       if (!book.bookAvailability) {
//         return res.status(400).json({ message: 'Book is not available for checkout' });
//       }
  
//       // Update bookAvailability and assign it to the student
//       book.bookAvailability = false;
  
//       await book.save();
//       res.status(200).json(book);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

export const checkOutBookByISBN = async (req, res) => {
    const { isbn, studentId, staffId } = req.params;
  
    try {
      const book = await Book.findOne({ bookISBN: isbn });
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      if (!book.bookAvailability) {
        return res.status(400).json({ message: 'Book is not available for checkout' });
      }
  
      // Update bookAvailability and assign it to the student
      book.bookAvailability = false;
  
      // Record checkout date
      const checkoutDate = new Date();
  
      // Calculate due date (example: 14 days from checkout)
      const dueDate = new Date(checkoutDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days
  
      await book.save();
  
      // Create a new Checkout entry in your database with returnDate initially set as null
    //   await Checkout.create({
    //     studentID: studentId,
    //     staffID: staffId,
    //     bookISBN: isbn,
    //     checkoutDate: checkoutDate,
    //     dueDate: dueDate,
    //     returnDate: null, // Initially set to null as the book is not returned yet
    //   });

      // Update staff's booksIssued count
        const staff = await Staff.findOneAndUpdate(
            { staffRollNumber: staffId }, // Find staff by roll number
            { $inc: { booksIssued: 1 } }, // Increment booksIssued by 1
            { new: true } // Get the updated staff record
        );
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//   export const updateBookAvailability = async (req, res) => {
//     const { isbn, available } = req.params;
  
//     try {
//       const book = await Book.findOne({ bookISBN: isbn });
  
//       if (!book) {
//         return res.status(404).json({ message: 'Book not found' });
//       }
  
//       book.bookAvailability = available === 'true'; // Update availability
  
//       await book.save();
  
//       res.status(200).json(book);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

//   export const createCheckoutEntry = async (req, res) => {
//     const { isbn, studentId, staffId } = req.params;
  
//     try {
//       const book = await Book.findOne({ bookISBN: isbn });
  
//       if (!book || !book.bookAvailability) {
//         return res.status(400).json({ message: 'Book not available for checkout' });
//       }
  
//       const checkoutDate = new Date();
//       const dueDate = new Date(checkoutDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  
//       // Update book availability
//       book.bookAvailability = false;
//       await book.save();
  
//       // Create checkout entry
//       const checkout = await Checkout.create({
//         studentID: studentId,
//         staffID: staffId,
//         bookISBN: isbn,
//         checkoutDate: checkoutDate,
//         dueDate: dueDate,
//         returnDate: null,
//       });
  
//       res.status(200).json(checkout);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

//   // Update booksIssued count in Staff
// export const updateBooksIssuedInStaff = async (req, res) => {
//     const { staffId } = req.params;
  
//     try {
//       const staff = await Staff.findOneAndUpdate(
//         { staffRollNumber: staffId }, // Find staff by roll number
//         { $inc: { booksIssued: 1 } }, // Increment booksIssued by 1
//         { new: true } // Get the updated staff record
//       );
  
//       if (!staff) {
//         return res.status(404).json({ message: 'Staff not found' });
//       }
  
//       res.status(200).json(staff);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
  // Return a book by ISBN
  export const returnBookByISBN = async (req, res) => {
    const { isbn } = req.params;
  
    try {
      const book = await Book.findOne({ bookISBN: isbn });
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Update bookAvailability and remove the student's ID
      book.bookAvailability = true;
  
      await book.save();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };