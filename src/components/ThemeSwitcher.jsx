import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Heart } from 'lucide-react';
import useStore from '../store/useStore';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useStore();

  const themes = [
    { id: 'light', name: 'Light', icon: <Sun size={18} />, color: '#ff4d6d' },
    { id: 'dark', name: 'Dark', icon: <Moon size={18} />, color: '#00f2ff' },
    { id: 'pink', name: 'Pink', icon: <Heart size={18} />, color: '#ff0054' },
  ];

  return (
    <div className="fixed top-32 right-8 z-50 flex flex-col gap-3">
      {themes.map((t) => (
        <motion.button
          key={t.id}
          whileHover={{ x: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(t.id)}
          className={`p-4 rounded-2xl glass flex items-center gap-3 transition-all duration-300 group ${
            theme === t.id ? 'border-birthday-pink border-2' : 'border-white/10'
          }`}
          title={t.name}
        >
          <div style={{ color: t.color }}>{t.icon}</div>
          <span className="text-[10px] uppercase font-black tracking-widest hidden group-hover:block transition-all">
            {t.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
