# Smart Bookmark Manager

A full-stack CRUD application to manage your favorite web links with a modern, responsive interface.

## 🚀 Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## 📁 Project Structure

```text
project-root
├── backend/
│   ├── controllers/      # API logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   ├── server.js         # Entry point
│   └── .env              # Backend configuration
└── frontend/
    ├── src/
    │   ├── components/   # UI components
    │   ├── services/     # API communication
    │   └── App.jsx       # Main application
    ├── tailwind.config.js
    └── .env              # Frontend configuration
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Run the backend:
```bash
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api/bookmarks
```
Run the frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Backend (Render)
1. Push the `backend` folder to a GitHub repo.
2. Create a new Web Service on Render.
3. Add environment variables: `MONGO_URI` and `PORT`.

### Frontend (Vercel)
1. Push the `frontend` folder to a GitHub repo.
2. Connect the repo to Vercel.
3. Add environment variable: `VITE_API_URL` pointing to your deployed backend.

## ✨ Features
- Add, Edit, and Delete bookmarks
- Live preview of link hostnames
- Responsive Card-based layout
- Success notifications and error handling
- Loading states for smooth UX
