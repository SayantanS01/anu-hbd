import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Story from './pages/Story';
import GalleryPage from './pages/GalleryPage';
import GamesPage from './pages/GamesPage';
import SurprisePage from './pages/SurprisePage';
import Admin from './pages/Admin';

// Components
import Navbar from './components/Navbar';
import ThreeScene from './components/ThreeScene';
import MusicPlayer from './components/MusicPlayer';
import ThemeSwitcher from './components/ThemeSwitcher';
import LoadingScreen from './components/LoadingScreen';
import ExperienceShell from './components/ExperienceShell';
import useStore from './store/useStore';

function AnimatedRoutes() {
  const location = useLocation();
  const { isExperienceStarted } = useStore();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/surprise" element={<SurprisePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const theme = useStore((state) => state.theme);
  const birthdayName = useStore((state) => state.birthdayName);
  const fetchConfig = useStore((state) => state.fetchConfig);

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.title = `Happy Birthday ${birthdayName} 🎉`;
  }, [theme, birthdayName]);

  return (
    <Router>
      <ExperienceShell>
        <Suspense fallback={<LoadingScreen />}>
          <div className="relative min-h-screen overflow-x-hidden bg-transparent">
            {/* Persistent Background 3D Scene */}
            <div className="fixed inset-0 z-0">
              <ThreeScene />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
              <Navbar />
              <AnimatedRoutes />
            </div>

            {/* Persistent UI elements */}
            <ThemeSwitcher />
            <MusicPlayer />
          </div>
        </Suspense>
      </ExperienceShell>
    </Router>
  );
}

export default App;
