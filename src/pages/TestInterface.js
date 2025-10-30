// client/src/pages/TestInterface.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from '../components/Timer';
// We'll create a simple api.js file to hold our API calls
import { startTest, submitAnswer } from '../services/studentService';

function TestInterface() {
  const [testInfo, setTestInfo] = useState({ subjectName: '', totalQuestions: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [resultId, setResultId] = useState(null);

  const { assignmentId } = useParams(); // Gets the test ID from the URL
  const navigate = useNavigate();

  // --- 1. Prevent Browser Back Button ---
  // This is a key requirement [cite: 29]
  useEffect(() => {
    // Push a new state to the history
    window.history.pushState(null, '', window.location.href);
    
    const handlePopState = (event) => {
      // Prevent the back action by pushing the state again
      window.history.pushState(null, '', window.location.href);
      alert('Going back to a previous question is not allowed.');
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // --- 2. Load the First Question ---
  useEffect(() => {
    const fetchFirstQuestion = async () => {
      try {
        // This calls your /api/student/test/:assignmentId/start endpoint
        const data = await startTest(assignmentId); 
        
        setTestInfo({
          subjectName: data.subjectName,
          totalQuestions: data.totalQuestions,
        });
        setCurrentQuestion(data.firstQuestion);
        setCurrentQuestionIndex(0);
        setResultId(data.resultId);
        setLoading(false);
      } catch (error) {
        console.error('Error starting test:', error);
        alert('Could not start test.');
        navigate('/dashboard'); // Redirect to dashboard on error
      }
    };
    fetchFirstQuestion();
  }, [assignmentId, navigate]);

  // --- 3. Handle Answer Submission ---
  const handleAnswerSubmit = async (isFinalSubmit = false) => {
    if (!selectedOption && !isFinalSubmit) {
      alert('Please select an answer.');
      return;
    }

    try {
      // This calls your /api/student/test/:assignmentId/submit-answer endpoint
      const data = await submitAnswer(assignmentId, {
        resultId: resultId,
        questionIndex: currentQuestionIndex,
        answer: selectedOption,
      });

      // Clear the selected option for the next question
      setSelectedOption('');

      if (data.testComplete || isFinalSubmit) {
        // --- Test is Over: Redirect to Results Page ---
        // We pass the resultId to the result page
        navigate('/test/result', { state: { resultId: resultId } });
      } else {
        // --- Load the Next Question ---
        setCurrentQuestion(data.nextQuestion);
        setCurrentQuestionIndex(data.nextQuestionIndex);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Error submitting answer.');
    }
  };

  const handleFinalSubmit = () => {
    if (window.confirm('Are you sure you want to submit the test?')) {
      handleAnswerSubmit(true); // Force submit
    }
  };

  if (loading) {
    return <div>Loading your test...</div>;
  }

  return (
    <div className="test-container">
      {/* Header as required  */}
      <header className="test-header">
        <h1>{testInfo.subjectName}</h1>
        <div className="test-info">
          Question: {currentQuestionIndex + 1} / {testInfo.totalQuestions}
        </div>
        {/* Timer component  */}
        <Timer onTimeUp={handleFinalSubmit} /> 
      </header>

      {/* Current Question Body */}
      <main className="question-body">
        <h3>{currentQuestion?.text}</h3>
        <div className="options-list">
          {currentQuestion?.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </main>

      {/* Footer with buttons [cite: 28, 30] */}
      <footer className="test-footer">
        <button onClick={() => handleAnswerSubmit(false)} className="next-button">
          Submit and Next
        </button>
        <button onClick={handleFinalSubmit} className="submit-test-button">
          Submit Test
        </button>
      </footer>
    </div>
  );
}

export default TestInterface;