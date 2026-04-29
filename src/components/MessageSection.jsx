import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';

export default function MessageSection() {
  const message = useStore((state) => state.message);

  return (
    <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl w-full glass p-8 sm:p-16 md:p-32 rounded-[3rem] sm:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] text-center relative z-10 backdrop-blur-3xl border border-white/10"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-birthday-pink font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-8 sm:mb-12 block"
        >
          Heartfelt Appreciation
        </motion.span>
        
        <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif italic leading-tight text-birthday-text dark:text-white mb-12 sm:mb-16">
          <Typewriter
            options={{
              strings: [message],
              autoStart: true,
              loop: false,
              delay: 40,
              cursor: "▎"
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-24 h-[1px] bg-birthday-pink/50" />
          <span className="text-birthday-pink font-bold tracking-[0.6em] uppercase text-xs">A Tribute to Anushmita</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Scroll to see her journey</span>
        <ChevronDown size={24} className="opacity-40" />
      </motion.div>
    </section>
  );
}
