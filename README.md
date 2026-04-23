# 🎓 Student Grievance Management System
### MERN Stack | AI308B - AI Driven Full Stack Development

---

## 📦 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Auth**: JWT + bcryptjs
- **Deployment**: GitHub + Render

---

## 🚀 Local Setup Guide

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Git

---

### Step 1 — Clone / Download the project

```bash
git clone https://github.com/YOUR_USERNAME/grievance-system.git
cd grievance-system
```

---

### Step 2 — Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Fill in `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/grievanceDB
JWT_SECRET=some_very_long_random_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```
Server runs at → http://localhost:5000

---

### Step 3 — Setup Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → http://localhost:5173

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register` | ❌ | Register student |
| POST | `/api/login` | ❌ | Login student |
| POST | `/api/grievances` | ✅ | Submit grievance |
| GET | `/api/grievances` | ✅ | Get all grievances |
| GET | `/api/grievances/search?title=xyz` | ✅ | Search grievances |
| GET | `/api/grievances/:id` | ✅ | Get grievance by ID |
| PUT | `/api/grievances/:id` | ✅ | Update grievance |
| DELETE | `/api/grievances/:id` | ✅ | Delete grievance |

> ✅ = Requires `Authorization: Bearer <token>` header

---

## ☁️ Deploy to GitHub + Render

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Student Grievance System"
git remote add origin https://github.com/YOUR_USERNAME/grievance-system.git
git push -u origin main
```

### Deploy Backend on Render
1. Go to [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables:
   - `MONGO_URI` → your MongoDB Atlas URI
   - `JWT_SECRET` → your secret key
   - `FRONTEND_URL` → your Render frontend URL
5. Click **Deploy**

### Deploy Frontend on Render
1. New → **Static Site**
2. Connect same GitHub repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` → `https://your-backend.onrender.com/api`
5. Click **Deploy**

---

## 🗂️ Project Structure

```
grievance-system/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protect middleware
│   ├── models/
│   │   ├── Student.js         # Student schema (bcrypt hashed password)
│   │   └── Grievance.js       # Grievance schema
│   ├── routes/
│   │   ├── authRoutes.js      # POST /register, POST /login
│   │   └── grievanceRoutes.js # Full CRUD + search
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GrievanceCard.jsx      # Edit/Delete inline card
│   │   │   ├── Navbar.jsx             # Top navigation + logout
│   │   │   ├── ProtectedRoute.jsx     # Route guard
│   │   │   └── SubmitGrievanceForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Global auth state
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # Main app page
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/
│   │   │   └── api.js                 # Axios API calls
│   │   ├── App.jsx                    # Routes
│   │   ├── main.jsx
│   │   └── index.css                  # Tailwind + custom classes
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── render.yaml
├── .gitignore
└── README.md
```

---

## 🧪 Testing with Postman / Thunder Client

Set base URL: `http://localhost:5000`

1. **Register** → `POST /api/register` → Body: `{ name, email, password }`
2. **Login** → `POST /api/login` → Body: `{ email, password }` → Copy token
3. All grievance endpoints → Add Header: `Authorization: Bearer <token>`

---

## 📝 MSE-2 Submission Checklist

- [ ] Code screenshots
- [ ] Postman/Thunder Client HTTP request screenshots (all 8 endpoints)
- [ ] MongoDB Atlas collection screenshots
- [ ] Render backend deployment screenshot
- [ ] Render frontend deployment screenshot  
- [ ] Live URLs for each endpoint
