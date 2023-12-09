import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteBook from './deletebook'; 


const BookList = ({ onUpdate, onDelete, canEdit }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get('http://localhost:3000/api/books');
      setBooks(result.data);
    };

    fetchBooks();
  }, []);

  const handleBookDeleted = (bookISBN) => {
    setBooks(books.filter((book) => book.bookISBN !== bookISBN));
  };

  return (
    <div>
      <h2 style={{ marginBottom: '10px', marginLeft: '10px'}}>Books</h2>
      {books.map((book) => (
        <div style={{ marginLeft: '20px', marginTop: '20px' }}  key={book.bookISBN}>
          <p>Book ISBN: {book.bookISBN}</p>
          <p>Book Title: {book.bookTitle}</p>
          <p>Book author: {book.bookAuthor}</p>
          <p>Book Availability: {book.bookAvailability ? 'Available' : 'Unavailable'}</p>
          <hr></hr>
          {canEdit && (
            <>
              <button onClick={() => onUpdate(book.bookISBN)}>Update</button>
              <DeleteBook bookISBN={book.bookISBN} onBookDeleted={handleBookDeleted} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
