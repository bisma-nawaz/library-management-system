import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema({
    bookISBN: 
    { 
        type: String,
        required: true,
        unique: true,
    },
    bookTitle:
    {
        type: String,
        required: true
    },
    bookAuthor:
    {
        type: String,
        required: true,
    },
    bookAvailability:
    {
        type: Boolean,
        required: true
    }
  });



const Book = mongoose.model('Book', bookSchema);

export default Book;