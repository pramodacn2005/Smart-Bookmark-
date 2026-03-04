import React, { useState, useEffect } from 'react';
import { Plus, X, Link as LinkIcon, Edit } from 'lucide-react';

const BookmarkForm = ({ onAdd, onUpdate, editingBookmark, setEditingBookmark }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (editingBookmark) {
            setTitle(editingBookmark.title);
            setUrl(editingBookmark.url);
        } else {
            setTitle('');
            setUrl('');
        }
    }, [editingBookmark]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !url) return;

        if (editingBookmark) {
            onUpdate(editingBookmark._id, { title, url });
        } else {
            onAdd({ title, url });
        }
        setTitle('');
        setUrl('');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 transform transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {editingBookmark ? <Edit size={20} className="text-blue-500" /> : <Plus size={20} className="text-indigo-500" />}
                    {editingBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
                </h2>
                {editingBookmark && (
                    <button
                        onClick={() => setEditingBookmark(null)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={18} className="text-gray-400" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Bookmark Title</label>
                    <input
                        type="text"
                        placeholder="e.g. My Favorite Programming Resources"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">URL</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <LinkIcon size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${editingBookmark
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                >
                    {editingBookmark ? 'Update Bookmark' : 'Save Bookmark'}
                </button>
            </form>
        </div>
    );
};

export default BookmarkForm;
