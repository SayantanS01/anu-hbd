import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';

export default function Hero() {
  const birthdayName = useStore((state) => state.birthdayName);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="z-10"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-birthday-pink font-black tracking-[0.5em] uppercase text-xs mb-8 block"
        >
          A Birthday Tribute to Excellence
        </motion.span>
        
        <h1 className="text-8xl md:text-[12rem] font-black mb-8 tracking-tighter leading-[0.8] font-serif italic text-birthday-text">
          Happy <br />
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="inline-block text-birthday-pink"
          >
            {birthdayName}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-xl md:text-2xl text-birthday-text font-bold max-w-2xl mx-auto tracking-wide">
            Wishing a fantastic year ahead to a truly inspiring individual.
          </p>
          
          <div className="flex gap-6 mt-8">
            <Link to="/story">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn-premium bg-birthday-text text-birthday-light px-12 py-4"
              >
                Wish
              </motion.button>
            </Link>
            <Link to="/gallery">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn-premium glass px-12 py-4 text-birthday-text border-birthday-text/20"
              >
                Gallery
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-birthday-text"
      >
        <ChevronDown size={48} strokeWidth={2} />
      </motion.div>
    </section>
  );
}
