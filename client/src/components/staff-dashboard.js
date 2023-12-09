// import React from 'react';

// const StaffDashboard = () => {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
//             <h1>Welcome to staff dashboard</h1>
//         </div>
//     );
// };

// export default StaffDashboard;


// // TODO: SHOW DIFFERENT HOMEPAGES FOR DIFFERENT USERS BASED ON THEIR ROLES IN THE DB: 


import React, { useState } from 'react';
import axios from 'axios';
import BookList from './booklist';
import UpdateBookModal from './updatebook';
import SearchBooks from './searchBook';
import SignoutButton from './signout';



const StaffDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);


  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
      setLoading(false);
      setShowBooks(true); 
    } catch (error) {
      console.error('Error fetching books:', error.response?.data.message || error.message);
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  const handleUpdateClick = (isbn) => {
    // find the book by ISBN:
    const bookToUpdate = books.find(book => book.bookISBN === isbn);
    setSelectedBook(bookToUpdate);
  };
  
  const handleBookUpdated = (updatedBook) => {
    // update the book to p\updated with the current update info
    setBooks(books.map((book) => 
      book.bookISBN === updatedBook.bookISBN ? updatedBook : book
    ));
    setSelectedBook(null);
  };


  const handleSearchResults = (results) => {
    setSearchResults(results);

};


const fetchFeedback = async () => {
  try {
      const response = await axios.get('http://localhost:3000/api/feedbacks');
      setFeedbackList(response.data);
  } catch (error) {
      console.error('Error fetching feedback:', error.response?.data.message || error.message);
  }
};



  return (
    <div>
      <h1>Staff Dashboard</h1>
      <SearchBooks style={{ marginBottom: '10px', marginLeft: '10px'}}  onResults={handleSearchResults} />
      {searchNotFound && <p style={{ marginBottom: '10px', marginLeft: '100px'}} >No book found with that ISBN.</p>}
      {searchResults.length > 0 && (
        <BookList style={{ marginBottom: '10px', marginLeft: '10px'}}  books={searchResults} canEdit={false} />
      )}
      <button style={{ marginBottom: '10px', marginLeft: '100px', marginTop: '50px'}}  onClick={fetchBooks} disabled={loading}>
        {loading ? 'Loading...' : 'See Books'}
      </button>
      {error && <p>{error}</p>}
      {showBooks && <BookList 
      books={books}  
      onUpdate={handleUpdateClick}  
      canEdit={true} />}
      {selectedBook && (
        <UpdateBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBookUpdated={handleBookUpdated}
        />
      )}
      <button style={{ marginBottom: '10px', marginLeft: '10px'}}  onClick={fetchFeedback}>See Feedback</button>
            {feedbackList.length > 0 && (
                <div>
                    <h2>Student Feedback</h2>
                    {feedbackList.map((feedback, index) => (
                        <div key={index}>
                            <p>Service Name: {feedback.serviceName}</p>
                            <p>Rating: {feedback.rating}</p>
                            <p>Content: {feedback.content}</p>
                            <hr></hr>
                        </div>
                    ))}
                </div> )}
      <SignoutButton /> 
    </div>
  );
};

export default StaffDashboard;
