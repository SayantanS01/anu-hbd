import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Navbar() {
  const location = useLocation();
  const birthdayName = useStore((state) => state.birthdayName);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Wish', path: '/story' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Games', path: '/games' },
    { name: 'Surprise', path: '/surprise' },
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max"
    >
      <nav className="glass px-4 sm:px-8 py-4 sm:py-6 rounded-full border border-white/10 flex items-center gap-3 sm:gap-8 shadow-2xl backdrop-blur-3xl">
        <Link to="/" className="text-sm sm:text-lg font-black tracking-tighter text-birthday-text uppercase border-r border-birthday-text/20 pr-4 sm:pr-8">
          {birthdayName}
        </Link>
        <div className="flex items-center gap-3 sm:gap-8 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
          <NavLink to="/" className={({ isActive }) => `text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'text-birthday-pink' : 'text-birthday-text/60 hover:text-birthday-text'}`}>Home</NavLink>
          <NavLink to="/story" className={({ isActive }) => `text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'text-birthday-pink' : 'text-birthday-text/60 hover:text-birthday-text'}`}>Wish</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'text-birthday-pink' : 'text-birthday-text/60 hover:text-birthday-text'}`}>Gallery</NavLink>
          <NavLink to="/games" className={({ isActive }) => `text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'text-birthday-pink' : 'text-birthday-text/60 hover:text-birthday-text'}`}>Games</NavLink>
          <NavLink to="/surprise" className={({ isActive }) => `text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'text-birthday-pink' : 'text-birthday-text/60 hover:text-birthday-text'}`}>Surprise</NavLink>
        </div>
      </nav>
    </motion.nav>
  );
}
