import React, { useState } from 'react';
import axios from 'axios';

const AddBookModal = ({ onClose, onBookAdded }) => {
  const [bookData, setBookData] = useState({
    bookISBN: '',
    bookTitle: '',
    bookAuthor: '',
    bookAvailability: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/books', bookData);
      onBookAdded(response.data); 
      onClose();
    } catch (error) {
      console.error('Error adding book:', error.response?.data.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookData({
      ...bookData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Book</h2>
        <form style={{ marginLeft: '20px' }} onSubmit={handleSubmit}>
          <input style={{ marginLeft: '20px' }}
            name="bookISBN"
            type="text"
            placeholder="ISBN"
            value={bookData.bookISBN}
            onChange={handleChange}
            required
          />
          <input style={{ marginLeft: '20px' }}
            name="bookTitle"
            type="text"
            placeholder="Book Title"
            value={bookData.bookTitle}
            onChange={handleChange}
            required
          />
          <input style={{ marginLeft: '20px' }}
            name="bookAuthor"
            type="text"
            placeholder="Author Name"
            value={bookData.bookAuthor}
            onChange={handleChange}
            required
          />
          <label>
            Availability:
            <input style={{ marginLeft: '20px' }}
              name="bookAvailability"
              type="checkbox"
              checked={bookData.bookAvailability}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
