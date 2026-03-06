# 🎓 Student Management System

A professional, single-page dashboard system for managing students, academic performance, and course enrollments. Built with a modern tech stack focused on performance, aesthetics, and user experience.

---

## 🚀 Overview

This project consists of a **React** frontend and a **Flask** backend. It features a sophisticated administrative dashboard and a personalized student portal.

### ✨ Key Features
- **Admin Dashboard**: Real-time stats, GPA distribution charts, and gender diversity metrics.
- **Student Management**: Full CRUD operations for student records.
- **Course Catalog**: Manage and browse academic courses with student enrollment capabilities.
- **Zero-Scroll UI**: A strictly enforced single-screen layout for a premium "application" feel.
- **Glassmorphism Design**: High-end aesthetic with radial gradients and backdrop-blur effects.
- **Dark Mode Support**: Seamless transition between light and dark themes.

---

## 📸 Screenshots




<img width="1917" height="958" alt="login" src="https://github.com/user-attachments/assets/115bd74c-3c36-486b-8b9c-0801c1fe6dee" />

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS (CSS Variables, Glassmorphism, Flexbox)
- **Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: React Icons
- **State Management**: Context API

### Backend
- **Framework**: Flask (Python)
- **Database**: SQLite
- **Security**: JWT Authentication

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.12+)

### 📂 Installation

#### 1. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### 2. Frontend Setup
```bash
cd react-training-Students-manager
npm install
npm run dev
```

---

## 🚢 Deployment

### Frontend (Vercel)
The project includes a `vercel.json` configuration. To deploy:
1. Connect your GitHub repository to Vercel.
2. Set the root directory to `react-training-Students-manager`.
3. Configure the following environment variable:
   - `VITE_API_URL`: Your backend API endpoint.

### Backend
Deploy the Flask application to a provider like Render, Railway, or Heroku. Ensure CORS is configured to allow your Vercel domain.

---

## 📝 License
MIT License. Feel free to use and modify for your own academic projects!
