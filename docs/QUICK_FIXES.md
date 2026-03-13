# 🚀 Loconomi - Quick Start Fixes Checklist

## Phase 1: Critical Security (Must Do)

### Authentication & Secrets
- [ ] Generate strong `JWT_SECRET` (use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Create `.env` file with:
  ```
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<generated-secret>
  PORT=3000
  NODE_ENV=development
  FRONTEND_URL=http://localhost:5173
  ```
- [ ] Create `src/.env` with:
  ```
  VITE_API_URL=http://localhost:3000/api
  VITE_SOCKET_URL=http://localhost:3000
  ```

### Install Dependencies
```bash
# Backend
npm install jsonwebtoken bcrypt express-validator helmet express-rate-limit

# OR if using yarn
yarn add jsonwebtoken bcrypt express-validator helmet express-rate-limit
```

### Create Auth Routes
- [ ] Create `backend/routes/authRoutes.js` with signup/login
- [ ] Add middleware folder: `backend/middleware/auth.js`
- [ ] Create jwt token verification middleware

### Fix app.js
- [ ] Add helmet() for security headers
- [ ] Add CORS configuration (not '*')
- [ ] Add global error handler

### Hash Passwords
- [ ] Update User model to hash passwords before save
- [ ] Update userService signup to use bcrypt

### Database
- [ ] Add unique index on User.email
- [ ] Verify geospatial indexes are working

---

## Phase 2: Backend Completion

- [ ] Add input validation to all routes using express-validator
- [ ] Add rate limiting middleware
- [ ] Add request/response logging
- [ ] Add pagination to getAllUsers/getAllProviders
- [ ] Fix Socket.IO CORS (not '*')
- [ ] Add authentication to socket handlers

---

## Phase 3: Frontend Integration

- [ ] Create `src/services/api.js` with fetch wrapper
- [ ] Create `src/context/AuthContext.jsx` for auth state
- [ ] Create `src/components/ErrorBoundary.jsx`
- [ ] Connect Login form to backend API
- [ ] Connect Registration to API
- [ ] Connect Hire page filters to backend
- [ ] Add loading states to all API calls
- [ ] Add error messages to UI

---

## Phase 4: Testing & Documentation

- [ ] Write basic tests
- [ ] Create API documentation
- [ ] Remove all console.log statements
- [ ] Create README with setup instructions
- [ ] Test security (CORS, auth, validation)

---

## Commands to Test

```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Test123!"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test123!"}'

# Test protected route (use token from login)
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

