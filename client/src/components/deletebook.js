import React from 'react';
import axios from 'axios';

const DeleteBook = ({ bookISBN, onBookDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${bookISBN}`);
      // callback function to remove book form the lsit
      onBookDeleted(bookISBN); 
    } catch (error) {
      console.error('Error deleting book:', error.response?.data.message || error.message);
    }
  };

  return (
    <button onClick={handleDelete}>Delete Book</button>
  );
};

export default DeleteBook;
