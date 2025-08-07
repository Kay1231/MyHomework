import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!content.trim()) {
      setError('评论内容不能为空');
      return;
    }
    
    if (content.length > 500) {
      setError('评论内容不能超过500字');
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit(content);
      setContent('');
    } catch (err) {
      setError('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-3">
          {user ? (
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          ) : (
            <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-10" />
          )}
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={user ? "写下你的评论..." : "请登录后发表评论"}
              disabled={!user || loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
            />
            
            {error && (
              <div className="mt-2 text-red-500 text-sm">{error}</div>
            )}
            
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={!user || loading || !content.trim()}
                className={`px-4 py-2 rounded-md ${
                  !user || loading || !content.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {loading ? '提交中...' : '发表评论'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;