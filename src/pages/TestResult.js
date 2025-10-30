// client/src/pages/TestResult.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// We'll add these two functions to our studentService
import { getTestResult, dismissTestResult } from '../services/studentService';

function TestResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { state } = useLocation(); // ✅ NEW
  const resultId = state?.resultId; // Get resultId from the URL
  const navigate = useNavigate();

  // 1. Fetch the result data on component load
  useEffect(() => {
    if (!resultId) {
      setError('No result ID found.');
      setLoading(false);
      return;
    }
    const fetchResult = async () => {
      try {
        const data = await getTestResult(resultId);
        setResult(data);
        setLoading(false);
      } catch (err) {
        // This will catch the error if the result has already been viewed 
        setError('Result not found or has already been dismissed.');
        setLoading(false);
      }
    };
    fetchResult();
  }, [resultId]);

  // 2. Handle the "Dismiss" button click
  const handleDismiss = async () => {
    try {
      // This calls your /api/student/test/dismiss-result endpoint
      await dismissTestResult(resultId);
      // Navigate the user to their dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error dismissing result:', error);
      alert('Could not dismiss result. Please contact support.');
    }
  };

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (error) {
    return (
      <div className="result-container error">
        <h2>{error}</h2>
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  // 3. Display the results as required 
  return (
    <div className="result-container">
      <h2>Your Test Result</h2>
      <div className="result-details">
        <p><strong>Name:</strong> {result.name}</p>
        <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
        <p><strong>Correct Questions:</strong> {result.correctQuestions}</p>
        <p><strong>Percentage Earned:</strong> {result.percentage.toFixed(2)}%</p>
      </div>
      <button onClick={handleDismiss} className="dismiss-button">
        Dismiss and Exit
      </button>
    </div>
  );
}

export default TestResult;