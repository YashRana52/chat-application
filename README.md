# 💬 Full Stack Chat App

A full-stack real-time Chat Application where users can send and receive messages instantly without reloading the app. Built using **MongoDB, Express, React, and Node.js**, this app leverages **Socket.IO** for real-time bi-directional communication between clients and the server.

---

## 🚀 Live Demo

🔗 [View Live](https://chat-applicatioclientt.vercel.app)  

---

## 📸 Screenshots

| Profile / Profile Page                    | Chat Conversation                  |
|-----------------------------------|-----------------------------------|
| ![Profile](./Screenshot%202025-09-20%20001811.png)   | ![Chat](./Screenshot%202025-09-20%20001724.png)   |

---

## ✨ Features

### 👥 User Side
- Signup and Login functionality.
- Send messages to other users **instantly** using Socket.IO.
- Receive messages in **real-time** without refreshing the page.
- View active users online.
- Responsive UI for desktop and mobile.



---

## ⚙️ Advanced Features
- 🔐 **Authentication**  
  Secure user authentication using JWT or any preferred auth method.

- ⚡ **Real-time Messaging with Socket.IO**  
  Enables instant message delivery between users without page reload.

- 🌐 **Deployment**  
  Frontend deployed using Vercel for free access online.

---

## 🧰 Tech Stack

### 💻 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios (for API requests)
- Socket.IO-client

### 🖥️ Backend
- Node.js
- Express.js
- MongoDB (Atlas )
- Mongoose
- Socket.IO
- JWT Authentication 

---

## 📂 Folder Structure

```bash
Chat_App/
├── frontend/          # React Frontend
│   ├── public/
│   └── src/
├── backend/           # Node.js + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── screenshots/       # UI screenshots
└── README.md


```

---

## 🧰 Local Setup Instructions

### ✅ Requirements:
- Node.js installed
- MongoDB connection ( Atlas)
- Vite

---

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URL=your_mongo_url
JWT_SECRET=your_jwt_secret

```

Start the server:

```bash
npm start
```

---

### 2️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_BACKEND_URL=http://localhost:5000

```

Start the frontend:

```bash
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

## 👨‍💻 Author

**Yash Rana**  
🎓 IET Lucknow  
📧 yashrana2200520100072@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/yashrana52)  
💻 [GitHub](https://github.com/YashRana52)


