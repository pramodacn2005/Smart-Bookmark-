import React, { useState, useEffect } from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkList from './components/BookmarkList';
import * as api from './services/api';
import { Bookmark as BookmarkIcon, Github } from 'lucide-react';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await api.getBookmarks();
      setBookmarks(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBookmark = async (bookmark) => {
    try {
      const response = await api.addBookmark(bookmark);
      setBookmarks([response.data.data, ...bookmarks]);
      showSuccess('Bookmark added successfully!');
    } catch (err) {
      setError('Failed to add bookmark');
    }
  };

  const handleUpdateBookmark = async (id, bookmark) => {
    try {
      const response = await api.updateBookmark(id, bookmark);
      setBookmarks(bookmarks.map(b => b._id === id ? response.data.data : b));
      setEditingBookmark(null);
      showSuccess('Bookmark updated successfully!');
    } catch (err) {
      setError('Failed to update bookmark');
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await api.deleteBookmark(id);
        setBookmarks(bookmarks.filter(b => b._id !== id));
        showSuccess('Bookmark deleted successfully!');
      } catch (err) {
        setError('Failed to delete bookmark');
      }
    }
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <BookmarkIcon size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              SmartBookmark
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Notifications */}
        <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
          {success && (
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce flex items-center gap-2">
              <span className="font-semibold">{success}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <span className="font-semibold">{error}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar Area - Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookmarkForm
                onAdd={handleAddBookmark}
                onUpdate={handleUpdateBookmark}
                editingBookmark={editingBookmark}
                setEditingBookmark={setEditingBookmark}
              />
              <div className="bg-indigo-900 rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Organize your links efficiently. Use descriptive titles to find your bookmarks faster using search.
                  </p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-700/30 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

          {/* Main Area - List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Gallery</h2>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                {bookmarks.length} Bookmarks
              </div>
            </div>

            <BookmarkList
              bookmarks={bookmarks}
              onEdit={setEditingBookmark}
              onDelete={handleDeleteBookmark}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
