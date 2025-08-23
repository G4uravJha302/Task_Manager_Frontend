# Node.js Email OTP Authentication System

This project implements a secure authentication system using Node.js, Express, MongoDB, and Email-based OTP (One-Time Password) verification. Users must verify their email via OTP before logging in.

---
## Features

- **User Signup**: Registers a new user and sends a 6-digit OTP to their email.
- **OTP Verification**: Verifies the OTP sent to the user's email.
- **Resend OTP**: Allows users to request a new OTP if the previous one expires.
- **Login with OTP**: Users log in with email and password, then verify via OTP.
- **JWT Token**: Issues a JWT token after successful OTP verification.
- **Secure Cookies**: JWT is stored in an HTTP-only cookie.

---

## API Endpoints

### 1. **Signup**

- **POST** `/auth/signup`
- **Body**: `{ name, email, password }`
- **Response**: `200 OK` if OTP sent

### 2. **Verify OTP**

- **POST** `/auth/verify-otp`
- **Body**: `{ email, otp }`
- **Response**: `200 OK` and sets JWT cookie

### 3. **Resend OTP**

- **POST** `/auth/resend-otp`
- **Body**: `{ email }`
- **Response**: `200 OK` if new OTP sent

### 4. **Login**

- **POST** `/auth/login`
- **Body**: `{ email, password }`
- **Response**: `200 OK` if OTP sent

---

## How It Works

1. **Signup**:  
   - User submits name, email, password.
   - System checks if user exists.
   - If not, hashes password, generates OTP, saves user, sends OTP email.

2. **OTP Verification**:  
   - User submits email and OTP.
   - System checks OTP and expiry.
   - If valid, clears OTP, issues JWT, sets cookie.

3. **Login**:  
   - User submits email and password.
   - If valid, generates OTP, sends OTP email.
   - User must verify OTP to complete login.

4. **Resend OTP**:  
   - User requests new OTP if previous expired.

---

## Environment Variables (`.env`)

```
PORT=xxxx
MONGO=<your-mongodb-uri>
JWT_SECRET=<your-secret>
```

---

## Security Notes

- Passwords are hashed using bcrypt.
- OTPs expire after 10 minutes.
- JWT tokens are stored in HTTP-only cookies.
- All sensitive routes require JWT authentication.

---

## Setup

1. Clone the repo.
2. Install dependencies:  
   `npm install`
3. Set up your `.env` file.
4. Start the server:  
   `npm run dev` or `node Server/server.js`

---
##