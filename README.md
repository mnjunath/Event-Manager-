# 🎉 Event Manager – Full Stack MERN Application

A full-stack Event Management web application where users can register, log in, create events, RSVP to events, and manage their RSVPs.  
Built using **React (Vite)** on the frontend and **Node.js, Express, MongoDB** on the backend.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes for authenticated users

### 📅 Events
- Create new events
- Update event details
- Delete events
- View all available events

### ✅ RSVP System
- RSVP to events
- Remove RSVP
- View all events you have RSVP’d to
- Automatic update of available slots

### 🎨 Frontend
- Built with React + Vite
- Plain CSS (no UI libraries)
- Responsive design (mobile friendly)
- Clean animations and smooth UI transitions

### ⚙️ Backend
- RESTful API with Express
- MongoDB with Mongoose
- Layered architecture (routes, controllers, services)
- Secure password hashing
- Token-based authorization middleware

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Plain CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt

---

## 📁 Project Structure

```text
event-manager/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
