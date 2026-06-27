import React, { useState } from 'react';
import { rewriteResumePDF } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import ListCard from '../components/ListCard';

function ResultsPage() {

  const [rewriting, setRewriting] = useState(false);
  const [rewriteError, setRewriteError] = useState('');

  const { state } = useLocation();
  const navigate = useNavigate();
  const analysis = state?.analysis;
  const file = state?.file;


  const handleRewrite = async () => {
    if (!file) return setRewriteError('Original file not found. Please re-upload.');
    setRewriting(true);
    setRewriteError('');
    try {
      await rewriteResumePDF(file);
    } catch (err) {
      setRewriteError('Something went wrong. Please try again.');
    } finally {
      setRewriting(false);
    }
  };

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No analysis found.</p>
          <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Your Resume Analysis</h1>
          <p className="text-gray-500 mt-1">Here's what our AI found</p>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ScoreCard title="ATS Score" score={analysis.atsScore} color="indigo" />
          <ScoreCard title="Internship Readiness" score={analysis.internshipReadiness} color="green" />
        </div>

        {/* Overall Feedback */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-2">📝 Overall Feedback</h2>
          <p className="text-gray-600">{analysis.overallFeedback}</p>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ListCard title="✅ Strengths" items={analysis.strengths} color="green" />
          <ListCard title="⚠️ Weaknesses" items={analysis.weaknesses} color="red" />
          <ListCard title="🎯 Missing Skills" items={analysis.missingSkills} color="orange" />
          <ListCard title="🔑 Suggested Keywords" items={analysis.keywords} color="blue" />
        </div>

        {/* Suggestions */}
        <ListCard title="💡 Improvement Suggestions" items={analysis.suggestions} color="indigo" />

        {/* Rewrite Button */}
        <div className="mt-6 bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-lg font-bold text-gray-700 mb-2">✍️ Want a Better Resume?</h2>
          <p className="text-gray-500 text-sm mb-4">
            AI will rewrite your resume with stronger language and download it as a PDF
          </p>
          {rewriteError && <p className="text-red-500 text-sm mb-3">{rewriteError}</p>}
          <button
            onClick={handleRewrite}
            disabled={rewriting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all
              ${rewriting ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {rewriting ? 'Rewriting & Generating PDF... ⏳' : 'Rewrite & Download PDF ✍️'}
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Analyze Another Resume
        </button>

      </div>
    </div>
  );
}

export default ResultsPage;