// client/src/pages/TeacherDashboard.js

import React, { useState } from 'react';
// Import both upload and download functions
import { downloadResults, uploadQuestions } from '../services/teacherService'; 
import { useAuth } from '../context/AuthContext'; // To log out

function TeacherDashboard() {
  const { logout } = useAuth();
  const [file, setFile] = useState(null);
  const [subjectId, setSubjectId] = useState('1'); // Example subject ID
  const [uploadMsg, setUploadMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // --- Upload Handler ---
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !subjectId) {
      setErrorMsg('Please select a subject and a file.');
      return;
    }
    setErrorMsg('');
    setUploadMsg('Uploading...');

    try {
      const res = await uploadQuestions(subjectId, file);
      setUploadMsg(res.msg); // "File uploaded..."
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || 'Upload failed.');
      setUploadMsg('');
    }
  };

  // --- Download Handler ---
  const handleDownload = async () => {
    try {
      await downloadResults(subjectId);
    } catch (error) {
      console.error('Error downloading results:', error);
      setErrorMsg('Could not download results.');
    }
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <button onClick={logout}>Logout</button>
      
      <hr />

      {/* --- UPLOAD SECTION --- */}
      <h3>Upload Question File</h3>
      <div>
        <label>Subject ID: </label>
        <input 
          type="text" 
          value={subjectId} 
          onChange={(e) => setSubjectId(e.target.value)} 
          placeholder="Enter Subject ID"
        />
      </div>
      <div>
        <label>Question File (.docx): </label>
        <input 
          type="file" 
          accept=".doc,.docx" 
          onChange={handleFileChange} 
        />
      </div>
      <button onClick={handleUpload}>Upload File</button>
      {uploadMsg && <p style={{ color: 'green' }}>{uploadMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <hr />

      {/* --- DOWNLOAD SECTION --- */}
      <h3>Download Subject Results</h3>
      <button onClick={handleDownload}>
        Download Encrypted Results (Subject {subjectId})
      </button>
    </div>
  );
}

export default TeacherDashboard;