import React from 'react';

function ScoreCard({ title, score, color }) {
  const colors = {
    indigo: 'text-indigo-600 bg-indigo-50',
    green: 'text-green-600 bg-green-50',
  };

  return (
    <div className={`rounded-2xl shadow p-6 text-center ${colors[color]} bg-white`}>
      <p className="text-gray-500 font-medium mb-2">{title}</p>
      <p className={`text-5xl font-bold ${colors[color].split(' ')[0]}`}>{score}</p>
      <p className="text-gray-400 text-sm mt-1">out of 100</p>
      <div className="mt-3 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color === 'indigo' ? 'bg-indigo-500' : 'bg-green-500'}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default ScoreCard;