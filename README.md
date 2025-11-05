#   MERN Notes App 

![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express.js-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Overview
**Momina MERN Notes App** is a full-stack note-taking web application built with the **MERN stack**.  
It allows users to create, edit, delete, and search notes while maintaining secure authentication and user profiles.  

---

## 🚀 Features
✅ Create new notes  
✅ Edit existing notes  
✅ Delete notes  
✅ User Sign Up & Sign In  
✅ Profile settings and updates  
✅ Search notes by title/content  
✅ Secure JWT-based authentication  
✅ Logout functionality  

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT (JSON Web Token) |
| **Logging** | Pino Logger |
| **Notifications** | React Toastify |
| **Backend Testing** | Mocha + Chai |
| **Frontend Testing** | Jest |
| **API Testing** | Postman |

---

## ⚙️ Implementation Details

1. **Frontend:** Built using React.js for a responsive and dynamic UI.  
2. **Backend:** Developed using Node.js and Express for RESTful APIs.  
3. **Logging:** Implemented using **Pino Logger** for tracking API events and errors.  
4. **Error & Success Handling:** Managed using **React Toastify**.  
5. **Authentication:** Secured routes with **JWT authentication** and middleware validation.  
6. **Database:** Data stored and managed using **MongoDB Atlas**.  
7. **Testing:**  
   - Backend tested using **Mocha + Chai**  
   - Frontend tested using **Jest**  
   - APIs tested through **Postman**

---
 ## 🧩 SonarQube Integration

SonarQube is integrated to ensure high **code quality** and **maintainability** across both frontend and backend.  
It performs static code analysis to identify bugs, vulnerabilities, and code smells.

<img width="399" height="466" alt="image" src="https://github.com/user-attachments/assets/9c7a43df-a7f5-42f5-9fad-70b3b86c323e" />


---



## 🧑‍💻 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/momina-mern-10pshine.git
cd momina-mern-10pshine
```
---
## 2️⃣ Install Dependencies

### For Backend:
```bash
cd backend
npm install
```
---
### For Frontend:
```bash
cd frontend
npm install
```
---

### 3️⃣ Environment Variables

Create a `.env` file in the **backend** directory and add the following:

```env
MONGO_URI=your_mongodb_atlas_connection_string  
JWT_SECRET=your_secret_key  
PORT=8080
```
---
### 4️⃣ Run the App

**Start Backend Server:**
```bash
npm run dev
```
---

**Start Frontend Server:**
```bash
npm start
```
---

The app will run on:
👉 http://localhost:3000

---
# 📁 Project Structure — momina-mern-10pshine
```
momina-mern-10pshine/
│
├── backend/
│ ├── Models/ # Contains MongoDB models (e.g., User, Note)
│ ├── Routes/ # API route definitions (e.g., auth, notes)
│ ├── Controllers/ # Handles logic for routes
│ ├── Middleware/ # Authentication, logging, error handling
│ └── server.js # Main backend server file
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # React pages (Home, Login, Signup, etc.)
│ │ ├── utils/ # Utility functions and helpers
│ │ └── App.js # Main React app file
│
└── README.md # Project documentation

```



