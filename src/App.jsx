import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { CustomThemeProvider } from "./theme/ThemeContext";
import { SquadProvider } from './context/SquadContext';
import { GamificationProvider } from "./context/GamificationContext";
import { ExamModeProvider } from "./context/ExamModeContext";

import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import QuestRoom from "./pages/QuestRoom";
import QuestFeed from "./pages/QuestFeed";
import Journal from "./pages/Journal";
import SquadHQ from "./pages/SquadHQ";
import AdminQuest from "./pages/AdminQuest";
import HighlightWall from "./pages/HighlightWall";
import Landing from "./pages/Landing";
import Intro from "./pages/Intro";
import Layout from "./components/Layout";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <CustomThemeProvider>
      <CssBaseline />
      <ExamModeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Intro />} />
            <Route path="/about" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<GamificationProvider><Onboarding /></GamificationProvider>} />

            {/* Protected Routes wrapped in data providers and Layout */}
            <Route element={<PrivateRoute><GamificationProvider><SquadProvider><Layout /></SquadProvider></GamificationProvider></PrivateRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/squad" element={<SquadHQ />} />
              <Route path="/quests" element={<QuestFeed />} />
              <Route path="/quest/:id" element={<QuestRoom />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/highlights" element={<HighlightWall />} />
              <Route path="/admin" element={<AdminQuest />} />
            </Route>
          </Routes>
        </Router>
      </ExamModeProvider>
    </CustomThemeProvider >
  );
}

export default App;
