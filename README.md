# user-auth

user-auth is a reusable Node.js project for user authentication and authorization. This project is designed to be easily integrated into any application, providing essential features like user registration, login, and token-based authentication.

---

## Features
- **User Registration**: Create new accounts with unique email addresses.
- **User Login**: Authenticate users and issue JWT tokens.
- **Protected Routes**: Access user-specific data with token-based validation.
- **Password Security**: Passwords are hashed using bcrypt before being stored in the database.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Lightweight framework for building RESTful APIs.
- **MongoDB**: Database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **JWT (jsonwebtoken)**: For secure token-based authentication.
- **bcrypt**: For password hashing.
- **dotenv**: To manage environment variables.
- **cors**: To enable cross-origin requests.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-auth.git
   ```

2. Navigate to the project directory:
   ```bash
   cd user-auth
   ```

3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

4. Create a `.env` file and configure the following variables:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000 # or your preferred port
   ```

5. Start the server:
   ```bash
   yarn start
   # or
   npm start
   ```

6. Test the API at `http://localhost:5000`.

---

## API Endpoints

### Public Endpoints

#### **Register User**
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Your Name",
    "email": "your-email@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **Login User**
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "your-email@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "<JWT-token>"
  }
  ```

### Protected Endpoints

#### **Get User Profile**
- **URL**: `/api/auth/profile`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: <JWT-token>
  ```
- **Response**:
  ```json
  {
    "user": {
      "_id": "user-id",
      "name": "Your Name",
      "email": "your-email@example.com",
      "createdAt": "2025-01-05T12:00:00Z"
    }
  }
  ```

---

## License
This project is licensed under the MIT License. Feel free to use and modify it for your applications.
