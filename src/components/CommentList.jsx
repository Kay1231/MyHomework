import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {comment.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{comment.username || '匿名用户'}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-gray-700 whitespace-pre-line">
                {comment.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;