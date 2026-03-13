# 📚 API Documentation - Loconomi

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### User Signup

Register a new user account.

```
POST /auth/user/signup
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "userType": "user"
}
```

**Password Requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Response (201):**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "user"
    }
  }
}
```

---

### User Login

Authenticate user credentials.

```
POST /auth/user/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "user"
    }
  }
}
```

**Response (401):**

```json
{
  "status": "error",
  "message": "Invalid email or password",
  "data": null
}
```

---

### Provider Signup

Register a new service provider.

```
POST /auth/provider/signup
```

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass123",
  "role": "Electrician",
  "wage": 65,
  "phone": "+1-555-0123"
}
```

**Valid Roles:**

- `Electrician`
- `Plumber`
- `Carpenter`
- `Painter`
- `Bakery Delivery`

**Response (201):**

```json
{
  "status": "success",
  "message": "Provider registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "provider": {
      "id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "Electrician",
      "wage": 65
    }
  }
}
```

---

### Provider Login

Authenticate provider credentials.

```
POST /auth/provider/login
```

**Request Body:**

```json
{
  "email": "jane@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "provider": {
      "id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "Electrician",
      "rating": 4.8
    }
  }
}
```

---

## User Endpoints

### Get User Profile

Get authenticated user's profile information.

```
GET /users/me
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "status": "success",
  "message": "User retrieved",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "rating": 0,
    "totalReviews": 0,
    "fixedLocation": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    },
    "createdAt": "2026-03-13T10:00:00.000Z"
  }
}
```

---

### Update User Profile

Update user information.

```
PATCH /users/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body (all optional):**

```json
{
  "name": "John Updated",
  "phone": "+1-555-9999",
  "profileImage": "https://...",
  "fixedLocation": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128]
  }
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "User updated",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+1-555-9999",
    "updatedAt": "2026-03-13T11:30:00.000Z"
  }
}
```

---

### Delete User Account

Delete user account permanently.

```
DELETE /users/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "status": "success",
  "message": "User deleted successfully",
  "data": null
}
```

---

### Request Service

Find nearby providers for a service.

```
POST /users/:id/request
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "serviceType": "Electrician",
  "location": {
    "longitude": -74.006,
    "latitude": 40.7128
  }
}
```

**Response (201):**

```json
{
  "status": "success",
  "message": "5 provider(s) found nearby",
  "data": {
    "providers": [
      {
        "id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "role": "Electrician",
        "rating": 4.8,
        "wage": 65,
        "availability": "Available"
      }
    ],
    "waitTime": 5,
    "userLocation": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    }
  }
}
```

---

## Provider Endpoints

### Get All Providers

List all available providers with pagination.

```
GET /providers?page=1&limit=20&role=Electrician&availability=Available&minRating=4.0
```

**Query Parameters:**

- `page` (int): Page number (default: 1)
- `limit` (int): Results per page (default: 20)
- `role` (string, optional): Filter by role
- `availability` (string, optional): Filter by availability
- `minRating` (float, optional): Minimum rating filter

**Response (200):**

```json
{
  "status": "success",
  "message": "All providers",
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "role": "Electrician",
      "wage": 65,
      "rating": 4.8,
      "availability": "Available",
      "serviceRadius": 10
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

### Get Provider by Role

Get providers filtered by service type.

```
GET /providers/role/Electrician?page=1&limit=20
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Electrician providers",
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "role": "Electrician",
      "wage": 65,
      "rating": 4.8,
      "availability": "Available"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

---

### Get Provider Details

Get specific provider information.

```
GET /providers/:id
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Provider retrieved",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-555-0123",
    "role": "Electrician",
    "wage": 65,
    "rating": 4.8,
    "totalReviews": 42,
    "availability": "Available",
    "description": "Professional electrician with 10+ years experience",
    "experience": "10+ years",
    "serviceRadius": 10,
    "fixedLocation": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    },
    "isVerified": true,
    "createdAt": "2026-01-15T10:00:00.000Z"
  }
}
```

---

### Get Provider Profile

Get authenticated provider's profile.

```
GET /providers/me
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):** Same as Get Provider Details

---

### Update Provider Profile

Update provider information.

```
PATCH /providers/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body (all optional):**

```json
{
  "name": "Jane Updated",
  "phone": "+1-555-9999",
  "wage": 70,
  "description": "Updated description",
  "experience": "12+ years",
  "profileImage": "https://...",
  "serviceRadius": 15
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Provider updated",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Jane Updated",
    "wage": 70,
    "updatedAt": "2026-03-13T11:30:00.000Z"
  }
}
```

---

### Update Availability

Set provider availability status.

```
PATCH /providers/:id/availability
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "availability": "Busy"
}
```

**Valid Values:**

- `Available`
- `Busy`

**Response (200):**

```json
{
  "status": "success",
  "message": "Availability updated",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "availability": "Busy",
    "updatedAt": "2026-03-13T11:35:00.000Z"
  }
}
```

---

### Delete Provider Account

Delete provider account.

```
DELETE /providers/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Provider deleted successfully",
  "data": null
}
```

---

## Error Responses

### 400 - Bad Request

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### 401 - Unauthorized

```json
{
  "status": "error",
  "message": "Access token required",
  "data": null
}
```

### 403 - Forbidden

```json
{
  "status": "error",
  "message": "Insufficient permissions",
  "data": null
}
```

### 404 - Not Found

```json
{
  "status": "error",
  "message": "Provider not found",
  "data": null
}
```

### 500 - Server Error

```json
{
  "status": "error",
  "message": "Internal Server Error",
  "data": null
}
```

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Header:** `RateLimit-Remaining`

When limit exceeded:

```
HTTP/1.1 429 Too Many Requests
```

---

## Socket.IO Events

### Client → Server

**providerLocationUpdate**

```javascript
socket.emit('providerLocationUpdate', {
  longitude: -74.006,
  latitude: 40.7128,
});
```

**userLocationUpdate**

```javascript
socket.emit('userLocationUpdate', {
  longitude: -74.006,
  latitude: 40.7128,
});
```

### Server → Client

**locationUpdated**

```javascript
socket.on('locationUpdated', (data) => {
  // { success: true }
});
```

**providerLocationUpdated**

```javascript
socket.on('providerLocationUpdated', (data) => {
  // { providerId: '...', location: { longitude, latitude } }
});
```

---

## Common Status Codes

| Code | Meaning           |
| ---- | ----------------- |
| 200  | OK                |
| 201  | Created           |
| 400  | Bad Request       |
| 401  | Unauthorized      |
| 403  | Forbidden         |
| 404  | Not Found         |
| 429  | Too Many Requests |
| 500  | Server Error      |

---

## Examples

### Complete Flow: User Requesting Service

1. **User logs in:**

```bash
curl -X POST http://localhost:3000/api/auth/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Pass123!"
  }'
# Returns: { token: "...", user: {...} }
```

2. **Request electrical service:**

```bash
curl -X POST http://localhost:3000/api/users/USER_ID/request \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serviceType": "Electrician",
    "location": {
      "longitude": -74.0060,
      "latitude": 40.7128
    }
  }'
# Returns: { providers: [...], waitTime: 5 }
```

3. **Connect with Socket.IO for real-time updates:**

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: { token: 'YOUR_TOKEN' },
});

socket.on('connect', () => {
  console.log('Connected!');
});

socket.on('providerLocationUpdated', (data) => {
  console.log(`Provider ${data.providerId} is now at:`, data.location);
});
```

---

## Best Practices

1. **Always include Authorization header** for protected routes
2. **Handle token expiration** - implement refresh token logic
3. **Validate input** on client side before sending
4. **Use pagination** for list endpoints (limit results)
5. **Cache responses** where appropriate
6. **Implement retry logic** for network failures
7. **Log errors** for debugging

---

## Need Help?

- Check `SETUP.md` for setup instructions
- Review `CODE_REVIEW.md` for architecture details
- Contact development team for support
