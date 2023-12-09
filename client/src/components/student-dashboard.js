// import React from 'react';

// const StudentBoard = () => {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
//             <h1>Welcome to student dashboard</h1>
//         </div>
//     );
// };

// export default StudentBoard;


// // TODO: SHOW DIFFERENT HOMEPAGES FOR DIFFERENT USERS BASED ON THEIR ROLES IN THE DB: 
import React, { useState } from 'react';
import axios from 'axios';
import BookList from './booklist';
import ServiceList from './serviceList';
import SubmitFeedbackForm from './submitfeedbackform';
import SearchBooks from './searchBook';
import SignoutButton from './signout';



const StudentDashboard = () => {
  const [books, setBooks] = useState([]);
  const [services, setServices] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [loading, setLoading] = useState({ books: false, services: false });
  const [error, setError] = useState({ books: '', services: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);



  const fetchBooks = async () => {
    setLoading((prev) => ({ ...prev, books: true }));
    setError((prev) => ({ ...prev, books: '' }));
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
      setShowBooks(true);
    } catch (err) {
      setError((prev) => ({ ...prev, books: err.message }));
    }
    setLoading((prev) => ({ ...prev, books: false }));
  };

  const fetchServices = async () => {
    setLoading((prev) => ({ ...prev, services: true }));
    setError((prev) => ({ ...prev, services: '' }));
    try {
      const response = await axios.get('http://localhost:3000/api/services');
      setServices(response.data);
      setShowServices(true);
    } catch (err) {
      setError((prev) => ({ ...prev, services: err.message }));
    }
    setLoading((prev) => ({ ...prev, services: false }));
  };

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(!showFeedbackForm);
  };

  const handleSearchResults = (results) => {
    // results containg the searched results 
      setSearchResults(results);

  };
  

  return (
    <div>
      <h1>Student Dashboard</h1>
      <SearchBooks style={{ marginBottom: '10px', marginLeft: '10px'}}  onResults={handleSearchResults} />
      {searchNotFound && <p>No book found with that ISBN.</p>}
      {searchResults.length > 0 && (
        <BookList style={{ marginBottom: '10px', marginLeft: '10px'}}  books={searchResults} canEdit={false} />
      )}
      <button style={{ marginBottom: '10px', marginLeft: '100px', marginTop: '50px'}}  onClick={fetchBooks} disabled={loading.books}>
        {loading.books ? 'Loading...' : 'See Books'}
      </button>
      <button style={{ marginBottom: '10px', marginLeft: '10px', marginTop: '50px'}} onClick={fetchServices} disabled={loading.services}>
        See Services
      </button>
      <button style={{ marginBottom: '10px', marginLeft: '10px', marginTop: '50px'}} onClick={toggleFeedbackForm}>
        Provide Feedback
      </button>
      <SignoutButton /> 
      {error.books && <p>{error.books}</p>}
      {showBooks && <BookList books={books} canEdit={false} />}
      {error.services && <p>{error.services}</p>}
      {showServices && <ServiceList services={services} />}
      {showFeedbackForm && <SubmitFeedbackForm onClose={toggleFeedbackForm} />}
    </div>
  );
};

export default StudentDashboard;
