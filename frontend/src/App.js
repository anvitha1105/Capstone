import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import GameAIImage from './components/games/GameAIImage';
import GameTextAI from './components/games/GameTextAI';
import GameMemory from './components/games/GameMemory';
import Leaderboard from './components/Leaderboard';
import UserStats from './components/UserStats';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth Context (kept for consumer components; defaults to Guest user)
const AuthContext = React.createContext();

function App() {
  const [user] = useState({ id: 'guest', username: 'Guest', total_games_played: 0, total_score: 0 });

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game/ai-image" element={<GameAIImage />} />
            <Route path="/game/text-ai" element={<GameTextAI />} />
            <Route path="/game/memory" element={<GameMemory />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/stats" element={<UserStats />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export { AuthContext, API };
export default App;