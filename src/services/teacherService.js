// client/src/services/teacherService.js

import api from './api'; // Your main axios instance

/**
 * Uploads an encrypted question file.
 * (This is for your upload form)
 */
export const uploadQuestions = async (subjectId, file) => {
  const formData = new FormData();
  // 'questionFile' must match the name in your route: upload.single('questionFile')
  formData.append('questionFile', file); 

  try {
    // POST /api/teacher/upload/questions/:subjectId
    const res = await api.post(
      `/teacher/upload/questions/${subjectId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};


/**
 * Downloads an encrypted Excel file of all results for a subject.
 * (This is for your download button)
 */
export const downloadResults = async (subjectId) => {
  try {
    const res = await api.get(
      `/teacher/results/${subjectId}/download`,
      {
        responseType: 'blob', // Tells axios to expect binary data
      }
    );

    // 1. Get the filename from the response headers
    const contentDisposition = res.headers['content-disposition'];
    let fileName = `encrypted_results_${subjectId}.xlsx.enc`; // Default
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (fileNameMatch && fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    // 2. Create a Blob URL to trigger the download
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    
    // 3. Append to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    throw err;
  }
};