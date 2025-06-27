# JWT-auth-nodejs

A complete authentication system with JWT tokens, OAuth integration, and user management capabilities.

## Features

- **Authentication**: Register, login, logout with JWT tokens
- **Password Management**: Forgot password, reset password, change password
- **Email Verification**: Account verification via email
- **OAuth Integration**: Google and GitHub authentication
- **Profile Management**: Get, update, delete user profiles
- **Admin Panel**: User management for administrators
- **Security**: JWT refresh tokens, rate limiting, password hashing

## Quick Start

### 1. Installation

```bash
git clone https://github.com/mohamedkhalil9/JWT-auth-nodejs.git
cd JWT-auth-nodejs
pnpm install
```

### 2. Environment Setup

Create a `.env` file:

```env
# Database
DB_URI=mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]

# JWT Secrets
ACCESS_SECRET=your-super-secret-jwt-key
REFRESH_SECRET=your-refresh-token-secret

# Email Configuration
EMAIL=your-email@gmail.com
PASS=your-app-password

# Email Verification
VERIFY_EMAIL_SECRET=your-email-verification-secret

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Cloudinary
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# App Settings
PORT=4000
COOKIE_SECRET=your-cookie-secret
```

### 3. Start the Server

```bash
pnpm dev
```

The API will be available at `http://localhost:4000`

### 4. Make Your First Request

```bash
# Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

## API Reference

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isVerified": false
  }
}
```

#### Login User

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

#### Logout User

```http
POST /api/auth/logout
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Refresh Token

```http
POST /api/auth/refresh
```

**Request Body:**

```json
{
  "refreshToken": "your-refresh-token"
}
```

### Password Management

#### Forgot Password

```http
POST /api/auth/forgot-password
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

#### Reset Password

```http
POST /api/auth/reset-password/:token
```

**Request Body:**

```json
{
  "password": "NewSecurePass123!"
}
```

#### Change Password

```http
PUT /api/auth/change-password
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Request Body:**

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewSecurePass123!"
}
```

### Email Verification

#### Verify Email

```http
GET /api/auth/verify-email/:token
```

#### Resend Verification Email

```http
POST /api/auth/resend-verification
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

### OAuth Authentication

#### Google OAuth

```http
GET /api/auth/google
```

#### Google OAuth Callback

```http
GET /api/auth/google/callback
```

#### GitHub OAuth

```http
GET /api/auth/github
```

#### GitHub OAuth Callback

```http
GET /api/auth/github/callback
```

### Profile Management

#### Get Profile

```http
GET /api/profile
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://example.com/avatar.jpg",
    "role": "user",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Profile

```http
PUT /api/profile
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

#### Delete Profile

```http
DELETE /api/profile
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

### Admin User Management

#### Get All Users (Admin Only)

```http
GET /api/admin/users?page=1&limit=10&search=john
```

**Headers:**

```
Authorization: Bearer admin-jwt-token
```

**Response:**

```json
{
  "success": true,
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15
  }
}
```

#### Get User by ID (Admin Only)

```http
GET /api/admin/users/:userId
```

#### Update User (Admin Only)

```http
PUT /api/admin/users/:userId
```

**Request Body:**

```json
{
  "firstName": "Updated Name",
  "role": "admin",
  "isVerified": true
}
```

#### Delete User (Admin Only)

```http
DELETE /api/admin/users/:userId
```

## Authentication Flow

### Standard Authentication

1. User registers with email/password
2. Verification email sent
3. User clicks verification link
4. User can now login
5. Login returns access token (5min) and refresh token (7 days)
6. Use access token for authenticated requests
7. Refresh access token when it expires

### OAuth Authentication

1. User clicks "Login with Google/GitHub"
2. Redirected to OAuth provider
3. User authorizes application
4. Redirected back with authorization code
5. Server exchanges code for user info
6. User account created/updated
7. Tokens returned to client

## Error Handling

The API uses standard HTTP status codes and returns errors in this format:

```json
{
  "status": "fial | error",
  "message": "Error description",
  "code": "error status code"
}
```

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (email already exists)
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Short-lived access tokens with refresh mechanism
- **Email Verification**: Required for account activation
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive request validation
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers middleware

## Changelog

### v1.0.0

- Initial release with full authentication system
- OAuth integration for Google and GitHub
- Admin user management
- Email verification system
