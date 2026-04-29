import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Star } from 'lucide-react';
import useStore from '../store/useStore';

export default function Surprise() {
  const [showSurprise, setShowSurprise] = useState(false);
  const { birthdayName, theme } = useStore();

  const themeColors = useMemo(() => {
    switch(theme) {
      case 'luxury': return ['#D4AF37', '#FCFBF4', '#1A1A1B'];
      case 'vibrant': return ['#FCE300', '#121212', '#ff0054'];
      case 'minimal': return ['#FFF44F', '#000000', '#FFFFFF'];
      default: return ['#FFFB01', '#000000', '#2F2F2F']; // electric
    }
  }, [theme]);

  const handleSurprise = () => {
    setShowSurprise(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: themeColors };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="py-32 px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="max-w-4xl mx-auto p-16 rounded-[4rem] relative overflow-hidden"
      >
        {!showSurprise ? (
          <div className="space-y-8">
            <Gift size={80} className="mx-auto text-birthday-pink animate-bounce" />
            <h2 className="text-5xl font-black tracking-tighter">One Final Surprise?</h2>
            <p className="text-xl opacity-70">You've reached the end, but the best is yet to come.</p>
            <button
              onClick={handleSurprise}
              className="btn-premium bg-birthday-pink text-birthday-light px-16 py-6 text-xl"
            >
              Click for Magic
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <h3 className="text-6xl md:text-8xl font-black text-birthday-pink flex items-center justify-center gap-4 font-serif italic">
              <Star className="animate-spin" /> HAPPY BIRTHDAY <Star className="animate-spin" />
            </h3>
            <p className="text-3xl font-bold">{birthdayName.toUpperCase()}</p>
            <p className="text-xl opacity-70">May your journey from here be as vibrant as this page!</p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-12 grid grid-cols-3 gap-8"
            >
              <div className="p-8 glass rounded-3xl">
                <p className="text-4xl font-black text-birthday-pink">2026</p>
                <p className="text-xs uppercase font-bold tracking-widest opacity-50">School Pass Out</p>
              </div>
              <div className="p-8 glass rounded-3xl">
                <p className="text-4xl font-black text-birthday-pink">∞</p>
                <p className="text-xs uppercase font-bold tracking-widest opacity-50">Success</p>
              </div>
              <div className="p-8 glass rounded-3xl">
                <p className="text-4xl font-black text-birthday-pink">❤</p>
                <p className="text-xs uppercase font-bold tracking-widest opacity-50">Happiness</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
