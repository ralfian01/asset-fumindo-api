# Asset Management API (NestJS)

Backend API for an asset management system built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **JWT-based authentication**.

This project is designed with a **clean and scalable architecture**, separating authentication, authorization, and business logic concerns.

---

## 1. Tech Stack

* Node.js >= 18
* NestJS
* Prisma ORM
* PostgreSQL
* JWT (Access Token)
* bcrypt

---

## 2. Prerequisites

Ensure your environment has the following installed:

* Node.js & npm
* PostgreSQL
* Git

---

## 3. Initial Project Setup

### 3.1 Clone Repository

```bash
git clone <repository-url>
cd API
```

### 3.2 Install Dependencies

```bash
npm install
```

---

## 4. Environment Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL="postgres://username:password@127.0.0.1:5432/asset_fumindo?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="1h"
```

---

## 5. Prisma Setup & Migration

### 5.1 Generate Prisma Client

```bash
npx prisma generate
```

### 5.2 Run Database Migration

```bash
npx prisma migrate dev --name init
```

### 5.3 Prisma Studio (Optional)

```bash
npx prisma studio
```

---

## 6. Database Seeding

Seeding is used to create initial data (e.g. admin account).

```bash
npx prisma db seed
```

The seeder will:

* Automatically generate UUIDs
* Hash passwords using bcrypt

---

## 7. Running the Application

```bash
npm run start:dev
```

The server will run at:

```
http://localhost:5500
```

---

## 8. Authentication Flow

### 8.1 Login (Basic Auth → JWT)

**Endpoint**

```
POST /auth/account
```

**Header**

```
Authorization: Basic base64(username:password)
```

**Success Response**

```json
{
  "code": 200,
  "status": "SUCCESS",
  "description": "Login success",
  "data": {
    "access_token": "jwt_token_here"
  }
}
```

---

## 9. Authorization

All endpoints except login are protected using **JWT Bearer Token**.

**Header**

```
Authorization: Bearer <jwt_token>
```

---

## 10. Asset Management API

### 10.1 Create Asset

```
POST /manage/assets
```

**Request Body**

```json
{
  "asset_name": "Laptop",
  "stock_quantity": 10,
  "category": "NON_CONSUMABLES"
}
```

---

### 10.2 Get All Assets (With Filters)

```
GET /manage/assets?category=CONSUMABLES&keyword=laptop
```

Query Parameters:

* `category` (optional)
* `keyword` (optional)

---

### 10.3 Update Asset

```
PUT /manage/assets/{asset_id}
```

---

### 10.4 Delete Asset

```
DELETE /manage/assets/{asset_id}
```

---

## 11. Standard API Response Format

### Success

```json
{
  "code": 200,
  "status": "SUCCESS",
  "description": "Operation success",
  "data": []
}
```

### Error

```json
{
  "code": 401,
  "status": "ERROR",
  "description": "Unauthorized",
  "error_details": "Invalid token"
}
```

---

## 12. Guards & Security

* `BasicAuthGuard` → Login endpoint
* `JwtAuthGuard` → Protected routes
* Password hashing using bcrypt
* Token-based authentication

---

## 13. Project Structure (Simplified)

```
src/
├── auth/
├── manage/
├── common/
│   ├── guards/
│   └── interceptors/
├── prisma/
└── app.module.ts
```

---

## 14. Architecture Notes

* JWT is configured as a **global module**
* No duplicated JwtModule registrations
* Guards act as authentication boundaries
* Prisma schema is the single source of truth

---

## 15. Roadmap

* Refresh Token implementation
* Role-based authorization
* Pagination & sorting
* Swagger (OpenAPI) documentation
* Rate limiting

---

## 16. License

Private / Internal Use
