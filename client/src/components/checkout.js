import React, { useState } from 'react';
import axios from 'axios';

const CheckoutBook = ({ bookISBN }) => {
  const [studentId, setStudentId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckoutClick = () => {
    setShowForm(true);
  };
  
  const handleCheckout = async () => {
    try {
      if (!studentId || !staffId) {
        console.error('Please fill all fields');
        return;
      }

      // Make a PUT request to check out the book by ISBN
      await axios.put(`http://localhost:3000/api/books/checkout/${bookISBN}/${studentId}/${staffId}`);

      // Additional logic after successful checkout (if needed)
      alert("Book checked out successfully!");

      // Reset form fields after successful checkout
      setStudentId('');
      setStaffId('');
      setSuccessMessage('Book checked out successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error checking out book:', error);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <button onClick={handleCheckoutClick}>Checkout Book</button>
      {showForm && (
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', marginTop: '10px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            Student ID:
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ marginTop: '5px', marginLeft: '10px' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
            Staff ID:
            <input type="text" value={staffId} onChange={(e) => setStaffId(e.target.value)} style={{ marginTop: '5px', marginLeft: '10px' }} />
          </label>
          <button style={{ marginTop: '10px'}} onClick={handleCheckout}>Confirm Checkout</button>
        </div>
      )}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CheckoutBook;