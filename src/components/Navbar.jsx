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
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl border border-white/20"
    >
      <Link to="/" className="text-lg font-black tracking-tighter text-birthday-pink">
        {birthdayName.toUpperCase()}
      </Link>
      
      <div className="h-4 w-[1px] bg-white/20" />
      
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-black tracking-widest transition-all relative ${
              location.pathname === item.path 
                ? 'text-birthday-pink' 
                : 'text-birthday-text hover:text-birthday-pink'
            }`}
          >
            {item.name}
            {location.pathname === item.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-birthday-pink rounded-full"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
