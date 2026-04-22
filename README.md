# 🐾 Animal Report App

🔗 Live Demo: https://animal-report-app.vercel.app/

An interactive web application that allows users to report, track, and visualize animal-related incidents or sightings on a map. This project was developed during an internship at Codec Technology.

---

## 📌 Features

- 📍 Report animal sightings/incidents with images
- 🗺️ Interactive map view for location tracking
- 🔐 Authentication with protected & public routes
- 📊 Organized reporting system
- ⚡ Real-time UI feedback using toast notifications
- 🧠 AI-powered image handling (Gemini Vision integration)
- 📱 Responsive and user-friendly interface

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** CSS / Tailwind (if used)
- **Routing:** React Router
- **Maps:** Map integration (custom/map APIs)
- **AI Integration:** Gemini Vision API
- **Build Tool:** Vite

---


## 🏗️ Project Structure

Based on your current directory, here is the organized structure of the frontend (Vite/React):

```text
pashu-jagarak/
├── node_modules/       # Project dependencies
├── public/              # Static assets (icons, images)
├── src/                 # Main source code
│   ├── assets/          # Project-specific images/styles
│   ├── components/      # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/           # Main views (Home, Report, Dashboard)
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (API Keys, URLs)
├── .gitignore           # Files to exclude from Git
├── eslint.config.js     # Linting configuration
├── index.html           # Main HTML file
├── package-lock.json    # Locked versions of dependencies
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
└── vite.config.js       # Vite build configuration