import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../services/api';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
    onDrop: (accepted) => {
      setFile(accepted[0]);
      setError('');
    }
  });

  const handleAnalyze = async () => {
    if (!file) return setError('Please upload a resume first.');
    setLoading(true);
    try {
      const data = await uploadResume(file);
      navigate('/results', { state: { analysis: data.analysis } });
    } catch (err) {
      setError('Something went wrong. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg">

        {/* Header */}
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-2">
          AI Resume Analyzer
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Upload your resume and get instant AI-powered feedback
        </p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          <div className="text-5xl mb-3">📄</div>
          {file ? (
            <p className="text-indigo-600 font-semibold">{file.name}</p>
          ) : (
            <>
              <p className="text-gray-600 font-medium">Drag & drop your resume here</p>
              <p className="text-gray-400 text-sm mt-1">or click to browse</p>
              <p className="text-gray-400 text-xs mt-2">Supports PDF, DOCX</p>
            </>
          )}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

        {/* Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !file}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all
            ${loading || !file
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {loading ? 'Analyzing... please wait ⏳' : 'Analyze My Resume 🚀'}
        </button>

      </div>
    </div>
  );
}

export default UploadPage;