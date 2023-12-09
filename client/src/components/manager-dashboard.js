import React, { useState } from 'react';
import axios from 'axios';
import BookList from './booklist';
import AddBookModal from './addBookForm';
import UpdateBookModal from './updatebook';
import SearchBooks from './searchBook';
import SignoutButton from './signout';



const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showStaffList, setShowStaffList] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [staffPerformance, setStaffPerformance] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);




  const [staffData, setStaffData] = useState({
    staffRollNumber: '',
    staffName: '',
    staffEmail: '',
    booksIssued: 0,
    staffSalary: 0,
    // here manger is the manager object ID created by mongodb
    manager: '' 
  });
  const [rollNumberToDelete, setRollNumberToDelete] = useState('');

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      // create a staff object from the staff data 
      const staffToAdd = {
        staffRollNumber: staffData.staffRollNumber,
        booksIssued: staffData.booksIssued,
        staffSalary: staffData.staffSalary,
        manager: staffData.manager,
        userId: staffData.userId, 
      };
  
      // post to add the staff 
      const response = await axios.post('http://localhost:3000/api/staff', staffToAdd);
      alert('Staff added successfully');
      setStaffData({
        staffRollNumber: '',
        booksIssued: 0,
        staffSalary: 0,
        manager: '', 
        userId: '',
      });
      fetchStaff();
    } catch (error) {
      alert('Failed to add staff: ' + (error.response?.data.message || error.message));
    }
  };
  

  // handle deleting staff
  const handleDeleteStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/api/staff/${rollNumberToDelete}`);
      alert('Staff deleted successfully');
    } catch (error) {
      alert('Failed to delete staff: ' + error.response?.data.message || error.message);
    }
  };

  // updating the data as the inout value changes 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData({ ...staffData, [name]: value });
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/staff');
      setStaffList(response.data);
      setShowStaffList(true);
    } catch (error) {
      alert('Failed to fetch staff: ' + error.response?.data.message || error.message);
    }
  };



  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
      setLoading(false);
      // show book: set to true
      setShowBooks(true); 
    } catch (error) {
      console.error('Error fetching books:', error.response?.data.message || error.message);
      setError('Failed to fetch books');
      setLoading(false);
    }
  };
  const handleUpdateClick = (isbn) => {
    const bookToUpdate = books.find(book => book.bookISBN === isbn);
    setSelectedBook(bookToUpdate);
  };
  

  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]); 
    setShowAddBookModal(false);
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks(books.map((book) => 
      book.bookISBN === updatedBook.bookISBN ? updatedBook : book
    ));
    setSelectedBook(null);
  };

  const handleBookDeleted = (bookISBN) => {
    setBooks(books.filter(book => book.bookISBN !== bookISBN));
  };
  


//   staff performacne: 
const fetchStaffPerformance = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/staff/performance');
        setStaffPerformance(response.data);
    } catch (error) {
        console.error('Error fetching staff performance:', error.response?.data.message || error.message);
    }
};


// get feedback: 
const fetchFeedback = async () => {
  try {
      const response = await axios.get('http://localhost:3000/api/feedbacks');
      setFeedbackList(response.data);
  } catch (error) {
      console.error('Error fetching feedback:', error.response?.data.message || error.message);
  }
};

// serach bar results: 
const handleSearchResults = (results) => {
  setSearchResults(results);

};

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <SearchBooks style={{ marginBottom: '10px', marginLeft: '10px'}}  onResults={handleSearchResults} />
      {searchNotFound && <p>No book found with that ISBN.</p>}
      {searchResults.length > 0 && (
        <BookList style={{ marginBottom: '10px', marginLeft: '10px'}}  books={searchResults} canEdit={false} />
      )}
      {error && <p>{error}</p>}
      {showBooks && 
      <BookList 
        books={books}  
        onUpdate={handleUpdateClick}  
        onDelete={handleBookDeleted} 
        canEdit={true} 
        />}
      {showAddBookModal && (
        <AddBookModal
          onClose={() => setShowAddBookModal(false)}
          onBookAdded={handleBookAdded}
        />
      )}
      {selectedBook && (
        <UpdateBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBookUpdated={handleBookUpdated}
        />
      )}
      <button style={{ marginLeft: '20px' }} onClick={() => setShowAddBookModal(true)}>Add New Book</button>
      <button style={{ marginLeft: '20px' }} onClick={fetchBooks} disabled={loading}>
        {loading ? 'Loading...' : 'See Books'}
      </button>
      <button style={{ marginLeft: '20px', marginTop: '20px' }} onClick={() => setShowAddForm(true)}>Add Staff</button>
      <button style={{ marginLeft: '20px' , marginTop: '20px'}} onClick={() => setShowDeleteForm(true)}>Delete Staff</button>
      <button style={{ marginLeft: '20px' , marginTop: '20px'}} onClick={fetchStaff}>See Staff</button>
      <button style={{ marginLeft: '20px' , marginTop: '20px'}} onClick={fetchStaffPerformance}>See Staff Performance</button>
      <SignoutButton /> 
      {showAddForm && (
  <form onSubmit={handleAddStaff}>
    {/* Add Staff form inputs */}
    <input style={{ marginLeft: '20px' }}
    type="text"
    name="staffRollNumber"
    value={staffData.staffRollNumber}
    onChange={handleInputChange}
    placeholder="Staff Roll Number"
    required
  />
  <input style={{ marginLeft: '20px' }}
    type="number"
    name="booksIssued"
    value={staffData.booksIssued}
    onChange={handleInputChange}
    placeholder="Books Issued"
    required
  />
  <input style={{ marginLeft: '20px' }}
    type="number"
    name="staffSalary"
    value={staffData.staffSalary}
    onChange={handleInputChange}
    placeholder="Staff Salary"
    required
  />
  <input style={{ marginLeft: '20px' }}
    type="text"
    name="manager"
    value={staffData.manager}
    onChange={handleInputChange}
    placeholder="Staff manager"
    required
  />
  <input style={{ marginLeft: '20px' }}
    type="text"
    name="userId"
    value={staffData.userId}
    onChange={handleInputChange}
    placeholder="User id: credentials table"
    required
  />
    <button style={{ marginLeft: '20px' }} type="submit">Add Staff</button>
  </form>
)}

{showDeleteForm && (
  <form onSubmit={handleDeleteStaff}>
    <input style={{ marginLeft: '20px' }}
      type="text"
      value={rollNumberToDelete}
      onChange={(e) => setRollNumberToDelete(e.target.value)}
      placeholder="Staff Roll Number"
      required
    />
    <button style={{ marginLeft: '20px' }} type="submit">Delete Staff</button>
  </form>)}
      {showStaffList && (
        <div>
        <h3 style={{ marginBottom: '10px', marginLeft: '10px'}}>Staff list</h3>
          {staffList.map(staff => (
            <div key={staff._id} style={{ marginBottom: '10px', marginLeft: '10px'}}>
                <p>Roll Number: <span style={{ marginRight: '5px' }}>{staff.staffRollNumber} Manager ID: {staff.manager}</span></p>
      </div>
    ))}
        </div>
      )}
      {staffPerformance.map((staff, index) => (
        <div style={{ marginBottom: '10px', marginLeft: '10px'}} key={staff._id}>
            <p>{index + 1}. {staff.staffRollNumber} - Books Issued: {staff.booksIssued}</p>
        </div>
    ))}
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
    </div>
  );
};

export default ManagerDashboard;
