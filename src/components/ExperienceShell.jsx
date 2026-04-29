import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import useStore from '../store/useStore';

export default function ExperienceShell({ children }) {
  const { isExperienceStarted, startExperience, birthdayName } = useStore();

  if (isExperienceStarted) return children;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-white dark:bg-[#050505] flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="max-w-4xl w-full text-center space-y-16 z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-birthday-pink font-bold tracking-[0.8em] uppercase text-xs"
          >
            A Professional Tribute
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none font-serif italic">
            Celebrating <br /> {birthdayName}
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startExperience}
          className="relative group inline-flex items-center justify-center p-1 overflow-hidden font-medium text-gray-900 rounded-full group bg-gradient-to-br from-birthday-text to-birthday-pink transition-all duration-1000"
        >
          <span className="relative px-16 py-8 transition-all ease-in duration-75 bg-white dark:bg-black rounded-full group-hover:bg-opacity-0 flex items-center gap-4 text-2xl font-black uppercase tracking-widest text-birthday-text dark:text-white">
            <Play fill="currentColor" size={24} /> Begin Tribute
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-4 pt-12"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-birthday-pink to-transparent" />
          <p className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-bold">
            Best Experienced with Sound
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
