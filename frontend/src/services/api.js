import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/bookmarks';

const api = axios.create({
    baseURL: API_URL,
});

export const getBookmarks = () => api.get('/');
export const addBookmark = (bookmark) => api.post('/', bookmark);
export const updateBookmark = (id, bookmark) => api.put(`/${id}`, bookmark);
export const deleteBookmark = (id) => api.delete(`/${id}`);

export default api;
