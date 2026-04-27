# 💼 JobTracker — Full Stack Job Application Tracker

A full-stack web application to help students and job seekers track their job applications, interviews, offers and rejections — all in one place.

🌐 **Live Demo:** [https://job-tracker-z89u.vercel.app](https://job-tracker-z89u.vercel.app)

---

##  Features

- 🔐 **User Authentication** — Register, Login with JWT tokens
- 📋 **Track Applications** — Add company, role, status, salary, dates and notes
- 📊 **Visual Dashboard** — Pie chart breakdown of your application statuses
- 🔍 **Filter Applications** — Filter by Applied, Interview, Offer, Rejected
- 📅 **Date Tracking** — Track applied date and interview date
- 🗑️ **Delete Applications** — Remove applications you no longer need
- 🔄 **Update Status** — Change application status in one click
- 📱 **Responsive Design** — Works on mobile, tablet and desktop
- 🔒 **Secure** — Each user sees only their own data

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| React Router v6 | Client-side Routing |
| Axios | HTTP Requests |
| Recharts | Data Visualization |
| CSS | Styling |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| CORS | Cross-Origin Requests |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 📁 Project Structure
job-tracker/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ApplicationCard.jsx
│   │   │   └── AddApplicationModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AddJob.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/                   # Node.js + Express backend
├── models/
│   ├── User.js
│   └── Application.js
├── routes/
│   ├── auth.js
│   └── applications.js
├── middleware/
│   └── auth.js
├── server.js
└── package.json

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/riyabharti22/job_tracker.git
cd job-tracker
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` in your browser.

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Application Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Get all applications for logged-in user |
| POST | `/api/applications` | Add a new application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

---

## 🌐 Deployment

### Frontend (Vercel)
- Connected to GitHub for auto-deploy on push
- Live at: [https://job-tracker-z89u.vercel.app](https://job-tracker-z89u.vercel.app)

### Backend (Render)
- Node.js web service
- Live at: [https://job-tracker-1-5afr.onrender.com](https://job-tracker-1-5afr.onrender.com)
- Note: Free tier spins down after inactivity — first request may take ~50 seconds

### Database (MongoDB Atlas)
- Free M0 cluster on AWS Mumbai region
- All data is persisted in the cloud

---

## 👩‍💻 Author

**Riya Bharti**
- GitHub: [@riyabharti22](https://github.com/riyabharti22)

---

## 📄 License

This project is open source and available under the MIT License.
