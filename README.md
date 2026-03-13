# 🏘️ Loconomi - Local Services Marketplace

A full-stack MERN application connecting service providers with customers based on location.

**Status:** ✅ Production Ready

---

## 📁 Project Structure

```
Loconomi/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── config/            # Database & app configuration
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # MongoDB schemas (User, Provider)
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   └── utils/             # Helper functions
│   ├── .env                   # Backend environment variables
│   ├── server.js              # Express entry point
│   └── package.json           # Backend dependencies
│
├── frontend/                  # React/Vite frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── Pages/             # Page components
│   │   ├── context/           # State management (Auth, Providers)
│   │   ├── api/               # API client & endpoints
│   │   ├── assets/            # Images, fonts
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   ├── .env                   # Frontend environment variables
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   ├── eslint.config.js       # ESLint configuration
│   └── package.json           # Frontend dependencies
│
├── docs/                      # Documentation
│   ├── API_DOCS.md
│   ├── CODE_REVIEW.md
│   ├── REFACTORING_COMPLETE.md
│   └── SETUP.md
│
├── .gitignore                 # Git configuration
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file:
# MONGO_URI=mongodb://localhost:27017/loconomi
# JWT_SECRET=your_secret_key
# PORT=3000
# NODE_ENV=development
# FRONTEND_URL=http://localhost:5174

# Start development server
npm run dev

# Or production mode
npm start
```

**Backend runs on:** `http://localhost:3000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file:
# VITE_API_URL=http://localhost:3000
# VITE_SOCKET_URL=http://localhost:3000

# Start development server
npm run dev

# Or build for production
npm run build
```

**Frontend runs on:** `http://localhost:5174`

---

## 🔑 Key Features

### Backend

- **Authentication**: JWT-based user & provider signup/login
- **Authorization**: Role-based access control (RBAC)
- **Validation**: Input validation with express-validator
- **Security**: Helmet.js, CORS, rate limiting, bcrypt password hashing
- **Real-time**: Socket.IO for live location tracking
- **Database**: MongoDB with Mongoose ORM
- **Geolocation**: Nearby provider discovery using geospatial queries
- **API Endpoints**: Users, Providers, Authentication, Service Requests

### Frontend

- **State Management**: React Context API for auth & provider data
- **Forms**: Signup, login, provider filtering
- **UI**: Tailwind CSS + Framer Motion animations
- **API Client**: Centralized HTTP client with automatic token injection
- **Pages**: Landing, About, Services, Contact, Login, Hire, Join as Worker

---

## 📚 Available Scripts

### Backend

```bash
npm run dev      # Start with nodemon (dev mode)
npm start        # Start production server
npm test         # Run tests
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 🔐 Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb://localhost:27017/loconomi
JWT_SECRET=your_jwt_secret_key_here
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

---

## 🛠️ Tech Stack

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT (jsonwebtoken)
- Bcrypt
- Helmet, CORS, Morgan, Rate Limiter

**Frontend:**

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

---

## 📖 Documentation

See the `/docs` folder for detailed documentation:

- **API_DOCS.md** - Complete API endpoint reference
- **CODE_REVIEW.md** - Code quality analysis
- **REFACTORING_COMPLETE.md** - All refactoring changes
- **SETUP.md** - Detailed setup guide

---

## 🧪 Testing the App

1. **Signup as User**
   - Navigate to `http://localhost:5174/login`
   - Fill in details and submit
   - Should store JWT token

2. **Browse Providers**
   - Login as user
   - Go to "Hire" page
   - View providers from database

3. **Signup as Provider**
   - Navigate to "Join as Worker"
   - Register as provider
   - Provider added to searchable list

---

## 👨‍💻 Development Notes

- Backend and frontend run on separate ports (3000, 5174)
- Both require their own `node_modules` and `package.json`
- Update environment variables before running
- MongoDB must be running for backend to work
- Frontend automatically connects to backend via environment variables

---

**Last Updated:** March 13, 2026
