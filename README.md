# Authentication System

A full-stack authentication application built with React and Express.js. This project allows users to register, log in, reset forgotten passwords, and securely update their passwords using a token-based password reset system.

## 🚀 Features

* User Registration
* User Login
* Password Validation
* Forgot Password Functionality
* Password Reset באמצעות Email
* Reset Token Verification
* Invalid or Expired Token Handling
* JWT Authentication
* Password Hashing using bcrypt
* Form Validation using Formik and Yup
* Toast Notifications
* Responsive User Interface

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Formik
* Yup
* React Toastify
* CSS

### Backend

* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* dotenv

### Email Service

* Brevo

## 📂 Project Features

### 🔐 Register

Users can create a new account by providing the required registration details.

### 🔑 Login

Registered users can log in using their email and password.

### 📧 Forgot Password

Users who forget their password can enter their registered email address to request a password reset link.

### 🔗 Token Verification

When the user opens the password reset link, the application verifies the token before allowing the password to be changed.

### 🔄 Reset Password

After successful token verification, users can create and confirm a new password.

### ⚠️ Invalid or Expired Link

The application displays an appropriate message when a password reset link is invalid or expired.

## 📁 Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone <your-repository-url>
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

### Install Backend Dependencies

```bash
cd backend
npm install
npm start
```

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key
```

⚠️ Never upload your `.env` file or API keys to GitHub.

## 📱 Responsive Design

The application includes responsive styling for:

* Desktop
* Tablet
* Mobile devices

## 🎯 Learning Outcomes

Through this project, I practiced:

* React Form Handling
* Formik Form Management
* Yup Validation
* Axios API Requests
* Express.js Routing
* MongoDB and Mongoose
* Password Hashing with bcrypt
* JWT Token Authentication
* Password Reset Flow
* Email Integration
* Error Handling
* Protected Authentication Logic

## 👨‍💻 Author

**Nirmal J Behanan**

MERN Stack Developer

[GitHub](https://github.com/NirmalJBehanan)

[LinkedIn](https://www.linkedin.com/in/nirmal-j-behanan/)

---

⭐ If you found this project useful, consider giving it a star!
