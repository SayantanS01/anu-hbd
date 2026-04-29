import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Image, Gamepad2, Gift, Sun, Moon } from 'lucide-react';
import useStore from '../store/useStore';

export default function Navbar() {
  const location = useLocation();
  const { birthdayName, theme, setTheme } = useStore();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Wish', path: '/story', icon: <Heart size={20} /> },
    { name: 'Gallery', path: '/gallery', icon: <Image size={20} /> },
    { name: 'Games', path: '/games', icon: <Gamepad2 size={20} /> },
    { name: 'Surprise', path: '/surprise', icon: <Gift size={20} /> },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block w-max"
      >
        <nav className="glass px-8 py-4 rounded-full border border-white/10 flex items-center gap-8 shadow-2xl backdrop-blur-3xl">
          <Link to="/" className="text-lg font-black tracking-tighter text-birthday-text uppercase border-r border-birthday-text/20 pr-8">
            {birthdayName}
          </Link>
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-black uppercase tracking-widest transition-all ${
                  location.pathname === item.path 
                    ? 'text-birthday-pink scale-110' 
                    : 'text-birthday-text/60 hover:text-birthday-text'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2 border-l border-birthday-text/20 pl-8">
            <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-birthday-pink text-white' : 'text-birthday-text/40'}`}><Sun size={16}/></button>
            <button onClick={() => setTheme('dark')} className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-birthday-pink text-white' : 'text-birthday-text/40'}`}><Moon size={16}/></button>
            <button onClick={() => setTheme('pink')} className={`p-2 rounded-full transition-all ${theme === 'pink' ? 'bg-birthday-pink text-white' : 'text-birthday-text/40'}`}><Heart size={16}/></button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Bottom Navbar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
      >
        <nav className="glass py-4 px-2 rounded-[2.5rem] border border-white/10 flex items-center justify-around shadow-[0_-20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === item.path 
                  ? 'text-birthday-pink scale-110' 
                  : 'text-birthday-text/40'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
            </Link>
          ))}
          <div className="w-[1px] h-8 bg-white/10 mx-1" />
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'pink' : 'dark')}
            className="p-3 rounded-2xl bg-birthday-pink/10 text-birthday-pink"
          >
            {theme === 'light' ? <Sun size={20}/> : theme === 'dark' ? <Moon size={20}/> : <Heart size={20}/>}
          </button>
        </nav>
      </motion.div>
    </>
  );
}
