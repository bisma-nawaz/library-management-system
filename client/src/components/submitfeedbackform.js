import React, { useState } from 'react';
import axios from 'axios';

const SubmitFeedbackForm = ({ onClose }) => {
  const [feedback, setFeedback] = useState({
    content: '',
    rating: '',
    studentrollNumber: '',
    serviceName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/feedbacks', feedback);
      alert('Feedback submitted successfully');
      onClose();
    } catch (error) {
      alert(`Failed to submit feedback: ${error.response?.data.message || error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  return (
    <div className="feedback-form">
      <h2 style={{ marginBottom: '10px', marginLeft: '10px'}} >Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input style={{ marginBottom: '10px', marginLeft: '10px'}}
          name="serviceName"
          value={feedback.serviceName}
          onChange={handleChange}
          placeholder="Service Name"
          required
        />
        <textarea style={{ marginBottom: '10px', marginLeft: '10px', borderRadius: '4px'}}
          name="content"
          value={feedback.content}
          onChange={handleChange}
          placeholder="Feedback Content"
          required
        />
        <input style={{ marginBottom: '10px', marginLeft: '10px'}}
          name="rating"
          type="number"
          value={feedback.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          required
        />
        <input style={{ marginBottom: '10px', marginLeft: '10px'}}
          name="studentrollNumber"
          value={feedback.studentrollNumber}
          onChange={handleChange}
          placeholder="Your Roll Number"
          required
        />
        <button style={{ marginBottom: '10px', marginLeft: '10px'}} type="submit">Submit Feedback</button>
        <button style={{ marginBottom: '10px', marginLeft: '10px'}} type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default SubmitFeedbackForm;
