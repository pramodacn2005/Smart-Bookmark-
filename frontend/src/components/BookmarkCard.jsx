import React from 'react';
import { Trash2, Edit2, ExternalLink, Globe } from 'lucide-react';

const BookmarkCard = ({ bookmark, onEdit, onDelete }) => {
    return (
        <div className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                        <Globe size={20} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(bookmark)}
                            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all"
                            title="Edit"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(bookmark._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">{bookmark.title}</h3>
                <p className="text-sm text-gray-400 font-medium mb-4 line-clamp-1 flex items-center gap-1">
                    {new URL(bookmark.url).hostname}
                </p>
            </div>

            <a
                href={bookmark.url.startsWith('http') ? bookmark.url : `https://${bookmark.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-between px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-colors group/link"
            >
                <span>Open Link</span>
                <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
        </div>
    );
};

export default BookmarkCard;
