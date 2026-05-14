import React from 'react';

function ListCard({ title, items, color }) {
  const colors = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    indigo: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-3">{title}</h2>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <li key={i} className={`text-sm px-3 py-2 rounded-lg ${colors[color]}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCard;