import React from 'react';
import BookmarkCard from './BookmarkCard';
import { Bookmark as BookmarkIcon } from 'lucide-react';

const BookmarkList = ({ bookmarks, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-40 bg-gray-100 rounded-xl"></div>
                ))}
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-100">
                <div className="p-4 bg-gray-50 rounded-full text-gray-300 mb-4">
                    <BookmarkIcon size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No bookmarks found</h3>
                <p className="text-gray-500">Get started by adding your first favorite link above!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
                <BookmarkCard
                    key={bookmark._id}
                    bookmark={bookmark}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default BookmarkList;
