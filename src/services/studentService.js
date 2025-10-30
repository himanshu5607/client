import api from './api';

/**
 * Starts the test and gets the first question.
 * (This one is already correct)
 */
export const startTest = async (assignmentId) => {
  try {
    const res = await api.get(`/student/test/${assignmentId}/start`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Submits an answer.
 * (This one is already correct)
 */
export const submitAnswer = async (assignmentId, answerData) => {
  try {
    const res = await api.post(`/student/test/${assignmentId}/submit-answer`, answerData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Fetches the final test result.
 * (FIXED: Changed to POST to match your controller)
 */
export const getTestResult = async (resultId) => {
  try {
    // Calls POST /api/student/test/result
    const res = await api.post('/student/test/result', { resultId });
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Tells the backend the result has been dismissed.
 * (FIXED: Corrected the URL path)
 */
export const dismissTestResult = async (resultId) => {
  try {
    // Calls POST /api/student/test/dismiss-result
    const res = await api.post('/student/test/dismiss-result', { resultId });
    return res.data;
  } catch (err) {
    throw err;
  }
};