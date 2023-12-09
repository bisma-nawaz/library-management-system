import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateBookModal = ({ book, onClose, onBookUpdated }) => {
  const [bookData, setBookData] = useState({
    bookISBN: '',
    bookTitle: '',
    bookAuthor: '',
    bookAvailability: true,
  });

  // load current data of the book at opening the modal 
  useEffect(() => {
    if (book) {
      setBookData({
        bookISBN: book.bookISBN,
        bookTitle: book.bookTitle,
        bookAuthor: book.bookAuthor,
        bookAvailability: book.bookAvailability,
      });
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        bookTitle: bookData.bookTitle,
        bookAuthor: bookData.bookAuthor,
        bookAvailability: bookData.bookAvailability,
      };
  
      const response = await axios.put(`http://localhost:3000/api/books/${bookData.bookISBN}`, updateData);
      // triggers the uodate book modal 
      onBookUpdated(response.data); 
      onClose(); 
    } catch (error) {
      console.error('Error updating book:', error.response?.data.message || error.message);
    }
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (!book) {
    return null; 
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form style={{ marginLeft: '20px' }} onSubmit={handleSubmit}>
          <label style={{ marginLeft: '20px' }}>ISBN:</label>
          <input style={{ marginLeft: '20px' }}
            name="bookISBN"
            type="text"
            value={bookData.bookISBN}
            onChange={handleChange}
            required
            readOnly
          />
          <label>Title:</label>
          <input style={{ marginLeft: '20px' }}
            name="bookTitle"
            type="text"
            value={bookData.bookTitle}
            onChange={handleChange}
            required
          />
          <label>Author:</label>
          <input style={{ marginLeft: '20px' }}
            name="bookAuthor"
            type="text"
            value={bookData.bookAuthor}
            onChange={handleChange}
            required
          />
          <label style={{ marginLeft: '20px' }}>Availability:</label>
          <input style={{ marginLeft: '10px' }}
            name="bookAvailability"
            type="checkbox"
            checked={bookData.bookAvailability}
            onChange={handleChange}
          />
          <button style={{ marginLeft: '-50px', marginTop: '5px' }} type="submit">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
