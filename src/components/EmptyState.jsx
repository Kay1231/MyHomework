import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, actionText, actionLink }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
      <div className="mx-auto mb-6">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      
      {actionText && actionLink && (
        <Link 
          to={actionLink}
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;