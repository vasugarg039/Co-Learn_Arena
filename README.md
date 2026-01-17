# 🌌 COlearn: The Cyberpunk Coding Arena

[![Vercel Deployment](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-F50057?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com/)

**COlearn** is a gamified, social coding platform designed to turn learning into a high-stakes adventure. Built with a sleek "Glassmorphism" cyberpunk aesthetic, it combines multiplayer competition with AI-powered mentorship.

---

## ✨ Key Features

### 🧠 AIBuddy (Gemini Integration)
Your 24/7 coding sensei. Toggle between **Omnis AI** (Classic) and **Gemini AI** (Frontier) for real-time guidance. Features a hyper-resilient fallback system that cycles through Gemini 2.5, 2.0, and 1.5 models to ensure you're never stuck.

### ⚔️ Game Arena: Code or Consequences
A multiplayer "Truth or Dare" style arena where squads face off. 
*   **Truth**: Solve complex MCQ logic puzzles.
*   **Dare**: Write and execute real code in our integrated terminal to survive the round.
*   **Dynamic Bots**: Level up alongside AI squadmates like Alex, Sam, and Jordan.

### 🗺️ Adaptive Learning Quests
An AI-generated roadmap that evolves with you. Complete nodes to earn XP, unlock new technologies, and climb the global leaderboard.

### 🏢 Squad HQ
Manage your team, track your coding streaks with our contribution calendar, and toggle "Exam Mode" for a distraction-free deep-work environment.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Material UI (MUI)
- **Animations**: Framer Motion (Staggered entry, 3D Tilt effects)
- **State/Backend**: Firebase (Auth & Firestore)
- **AI**: Google Gemini API (v1beta/v1)
- **Code Execution**: Piston API (Multi-language support)
- **Styling**: Vanilla CSS + Glassmorphism Design System

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/COlearn.git
   cd COlearn
2. Install dependencies:
   ```bash
   npm install
3. Create a `.env` file in the root:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_google_ai_studio_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📦 Deployment

This project is optimized for **Vercel**. It includes serverless functions in the `/api` directory to securely proxy AI requests and hide your API keys.

To deploy:
```bash
npx vercel --prod
```

---

## 🎨 Aesthetic Philosophy
COlearn uses a **Dark-First Glassmorphism** design. 
- **Primary Color**: `#6366f1` (Indigo Neon)
- **Secondary Color**: `#8b5cf6` (Purple Glow)
- **Accent Color**: `#f50057` (Gemini Pink)
- **Background**: Deep Space Slate (`#0f172a`) with blurred backdrops.

---

MIT License © 2026 COlearn Team
