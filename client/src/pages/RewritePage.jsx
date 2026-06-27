import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { rewriteResume } from '../services/api';

function RewritePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (accepted) => {
      setFile(accepted[0]);
      setError('');
      setResult('');
    }
  });

  const handleRewrite = async () => {
    if (!file) return setError('Please upload your resume first.');
    setLoading(true);
    setError('');
    try {
      const data = await rewriteResume(file);
      setResult(data.rewritten);
    } catch (err) {
      setError('Something went wrong. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10">

          {/* Header */}
          <h1 className="text-3xl font-bold text-indigo-700 text-center mb-2">
            AI Resume Rewriter
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Upload your resume and AI will rewrite it with stronger language
          </p>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer mb-6 transition-all
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
          >
            <input {...getInputProps()} />
            <div className="text-4xl mb-2">✍️</div>
            {file
              ? <p className="text-indigo-600 font-semibold">{file.name}</p>
              : <>
                  <p className="text-gray-600 font-medium">Drag & drop your resume here</p>
                  <p className="text-gray-400 text-sm mt-1">or click to browse · PDF, DOCX</p>
                </>
            }
          </div>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          {/* Rewrite Button */}
          <button
            onClick={handleRewrite}
            disabled={loading || !file}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all mb-6
              ${loading || !file
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Rewriting your resume... ⏳' : 'Rewrite My Resume ✍️'}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-700">✅ Rewritten Resume</h2>
                <button
                  onClick={handleCopy}
                  className="text-sm px-4 py-1.5 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition font-medium"
                >
                  {copied ? 'Copied! ✓' : 'Copy Text'}
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 whitespace-pre-wrap text-sm text-gray-700 max-h-96 overflow-y-auto">
                {result}
              </div>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full mt-6 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
          >
            ← Back to Analyzer
          </button>

        </div>
      </div>
    </div>
  );
}

export default RewritePage;