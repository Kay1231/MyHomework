import React, { useState } from 'react';

export default function CommentSection({ comments, onAddComment }) {
  const [commentContent, setCommentContent] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      alert('请先登录');
      return;
    }
    if (commentContent.trim()) {
      onAddComment(commentContent);
      setCommentContent('');
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">评论</h3>
      
      {/* 添加评论表单 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="写下你的评论..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            提交评论
          </button>
        </div>
      </form>
      
      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无评论</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">{comment.user.username}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}