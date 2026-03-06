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
<img width="1900" height="959" alt="register" src="https://github.com/user-attachments/assets/2ba5e1d8-8cb1-41c8-ac6f-9fa67f177404" />
<img width="1919" height="958" alt="Screenshot 2026-03-06 170133" src="https://github.com/user-attachments/assets/d0d96daf-51ce-4d51-b1c3-1a88d90eb1b1" />
<img width="1919" height="949" alt="Screenshot 2026-03-06 170143" src="https://github.com/user-attachments/assets/94805d99-212d-4ae5-95dd-4de0342bbc8a" />
<img width="1919" height="962" alt="Screenshot 2026-03-06 165846" src="https://github.com/user-attachments/assets/bc5a5a98-ae89-4010-8f94-b6f7ab21f67e" />
<img width="1919" height="957" alt="Screenshot 2026-03-06 165856" src="https://github.com/user-attachments/assets/8f3b4b47-7a85-4192-a831-6285b8a84623" />
<img width="1904" height="959" alt="Screenshot 2026-03-06 165906" src="https://github.com/user-attachments/assets/05243e5f-c2c9-4cfd-acd5-0d3e6578b230" />
<img width="1901" height="953" alt="Screenshot 2026-03-06 165830" src="https://github.com/user-attachments/assets/0dfcee2d-4029-4d9a-af1b-c6c2ddf7f063" />
<img width="1919" height="954" alt="Screenshot 2026-03-06 171801" src="https://github.com/user-attachments/assets/2cf29539-3e41-49c0-8d74-b3c351994abd" />

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
