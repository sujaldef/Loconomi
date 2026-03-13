# 🚀 Loconomi - Full Setup Guide

## Project Structure

```
Loconomi/
├── backend/                    # Express.js Server
│   ├── src/
│   │   ├── config/            # Database & Socket.IO config
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   └── app.js             # Express app setup
│   ├── server.js              # Server entry point
│   ├── package.json
│   ├── .env                   # Configuration (create from .env.example)
│   └── .env.example           # Template
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── api/               # API client
    │   ├── context/           # State management (Auth, Providers)
    │   ├── components/        # Reusable components
    │   ├── Pages/             # Page components
    │   └── App.jsx            # Root component
    ├── package.json
    ├── vite.config.js
    ├── .env                   # Configuration
    └── index.html
```

---

## Prerequisites

- **Node.js** v18+ and **npm** v9+
- **MongoDB Atlas** cluster (free tier available)
- **Git** (optional)

---

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create `.env` file from template:

```bash
cp .env.example .env
```

Edit `.env` with your details:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/loconomi
JWT_SECRET=your-secret-key-change-this
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Get Credentials:**

- **MongoDB URI**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  1. Create free cluster
  2. Get connection string
  3. Replace `<username>`, `<password>`, `<cluster>`

- **JWT_SECRET**: Generate with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### 3. Start Backend

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Expected output:

```
╔╦╗  ╓──────────────────────────────╖
║║║  ║  🚀 Loconomi Server Started  ║
║║║  ║  ✅ Server running on port 3000 ║
║║║  ║  ✅ MongoDB connected          ║
║║║  ║  ✅ Socket.IO initialized      ║
║║║  ╙──────────────────────────────╜
```

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

### 3. Start Frontend

```bash
npm run dev
```

Open browser: **http://localhost:5173**

---

## API Endpoints

### Authentication

```
POST   /api/auth/user/signup      - User registration
POST   /api/auth/user/login       - User login
POST   /api/auth/provider/signup  - Provider registration
POST   /api/auth/provider/login   - Provider login
```

### Users

```
GET    /api/users/me              - Get profile (auth required)
PATCH  /api/users/:id             - Update profile (auth required)
DELETE /api/users/:id             - Delete account (auth required)
POST   /api/users/:id/request     - Request service (auth required)
```

### Providers

```
GET    /api/providers             - List all providers (with pagination)
GET    /api/providers/:id         - Get provider details
GET    /api/providers/role/:role  - Get providers by role
GET    /api/providers/me          - Get profile (auth required)
PATCH  /api/providers/:id         - Update profile (auth required)
PATCH  /api/providers/:id/availability - Update availability (auth required)
DELETE /api/providers/:id         - Delete account (auth required)
```

---

## Testing API with curl

### 1. User Signup

```bash
curl -X POST http://localhost:3000/api/auth/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

Response:

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2. Provider Signup

```bash
curl -X POST http://localhost:3000/api/auth/provider/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@ример.com",
    "password": "SecurePass123",
    "role": "Electrician",
    "wage": 65,
    "phone": "555-1234"
  }'
```

### 3. Get All Providers

```bash
curl http://localhost:3000/api/providers?page=1&limit=20
```

### 4. Request Service (with Auth)

```bash
curl -X POST http://localhost:3000/api/users/USERID/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "serviceType": "Electrician",
    "location": {
      "longitude": -74.0060,
      "latitude": 40.7128
    }
  }'
```

---

## Features Implemented ✅

### Backend

- ✅ JWT Authentication (users & providers)
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Input validation & sanitization
- ✅ Global error handling
- ✅ CORS configured properly
- ✅ Rate limiting
- ✅ Geospatial queries (MongoDB)
- ✅ Pagination support
- ✅ Socket.IO for real-time updates

### Frontend

- ✅ Authentication Context
- ✅ Provider Context (data management)
- ✅ API client with interceptors
- ✅ Login form connected to backend
- ✅ Hire page with API integration
- ✅ Error boundaries
- ✅ Loading states
- ✅ Protected routes (partially)
- ✅ Environment configuration

---

## Next Steps to Complete

### Frontend Enhancements

- [ ] Create signup form (user & provider)
- [ ] Add authentication guards for protected routes
- [ ] Update RegisterWorkers form to submit to API
- [ ] Implement Socket.IO integration for real-time location tracking
- [ ] Add pagination controls in Hire page

### Additional Features

- [ ] Service request booking system
- [ ] Payment integration
- [ ] Reviews & ratings system
- [ ] User notifications
- [ ] Admin dashboard
- [ ] Email verification
- [ ] Password reset functionality

### Testing & QA

- [ ] Write unit tests (Jest)
- [ ] Integration tests (Supertest)
- [ ] E2E tests (Cypress)
- [ ] Load testing

---

## Troubleshooting

### MongoDB Connection Issues

**Error:** `querySrv ENOTFOUND`

**Solutions:**

1. Check MongoDB Atlas cluster is running
2. Verify connection string is correct
3. Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
4. Ensure network connectivity

### Port Already in Use

```bash
# Kill process using port 3000
# On Windows:
netstat -ano | find "3000"
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Performance Tips

1. **Database**: Create indexed queries
2. **Frontend**: Lazy load routes
3. **Backend**: Add caching with Redis (optional)
4. **Images**: Use CDN for static assets

---

## Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with expiration
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Input validation
- ✅ Error messages non-verbose
- ⚠️ TODO: Add CSRF protection
- ⚠️ TODO: Add HTTPS in production

---

## Deployment

### Backend (Heroku example)

```bash
heroku create loconomi-api
git push heroku main
heroku config:set MONGODB_URI=your_uri
```

### Frontend (Vercel example)

```bash
npm run build
vercel deploy
```

---

## Support

For issues or questions, check:

- Code review document: `CODE_REVIEW.md`
- Architecture docs: `API_DOCS.md` (coming soon)

Happy building! 🎉
