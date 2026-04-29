import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// 1. Balloon Pop Game
const BalloonPop = () => {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState([]);

  const createBalloon = () => ({
    id: Math.random(),
    x: Math.random() * 80 + 10,
    color: ['#fec5bb', '#f8edeb', '#fae1dd', '#ffb5a7'][Math.floor(Math.random() * 4)],
    size: Math.random() * 40 + 40,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (balloons.length < 5) {
        setBalloons(prev => [...prev, createBalloon()]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [balloons]);

  const pop = (id) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 } });
  };

  return (
    <div className="h-[400px] bg-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/10">
      <div className="absolute top-4 left-6 text-xl font-bold opacity-50">Score: {score}</div>
      <AnimatePresence>
        {balloons.map(b => (
          <motion.div
            key={b.id}
            initial={{ y: 450, opacity: 0 }}
            animate={{ y: -50, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            onClick={() => pop(b.id)}
            className="absolute cursor-pointer"
            style={{ left: `${b.x}%`, backgroundColor: b.color, width: b.size, height: b.size * 1.2, borderRadius: '50%' }}
          />
        ))}
      </AnimatePresence>
      {score === 0 && <div className="text-white/30 text-center px-10">Click floating balloons to pop them!</div>}
    </div>
  );
};

// 2. Memory Game
const MemoryGame = () => {
  const cards = ['🎂', '🎈', '🎁', '✨', '💖', '🍭'].flatMap(c => [c, c]);
  const [shuffled, setShuffled] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    setShuffled(cards.sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (shuffled[newFlipped[0]] === shuffled[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
          confetti({ particleCount: 150, spread: 70 });
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {shuffled.map((card, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(i)}
          className={`h-20 sm:h-24 flex items-center justify-center text-3xl sm:text-4xl rounded-2xl cursor-pointer transition-all duration-300 ${
            flipped.includes(i) || solved.includes(i) ? 'bg-birthday-pink scale-105' : 'glass'
          }`}
        >
          {flipped.includes(i) || solved.includes(i) ? card : '?'}
        </motion.div>
      ))}
    </div>
  );
};

// 3. Wish Generator
const WishGenerator = () => {
  const wishes = [
    "May your year be as bright as your smile! ✨",
    "Keep shining like the star you are! 🌟",
    "To many more adventures and laughter! 🥂",
    "Stay amazing and stay YOU! 💖",
    "May all your dreams take flight today! 🎈"
  ];
  const [wish, setWish] = useState(wishes[0]);

  return (
    <div className="glass p-8 rounded-3xl text-center h-full flex flex-col justify-between">
      <div className="text-4xl mb-4">🔮</div>
      <motion.p key={wish} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-lg italic font-medium italic">
        "{wish}"
      </motion.p>
      <button 
        onClick={() => setWish(wishes[Math.floor(Math.random() * wishes.length)])}
        className="mt-6 btn-premium bg-birthday-pink text-white justify-center"
      >
        <RotateCcw size={18} /> New Wish
      </button>
    </div>
  );
};

export default function Games() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Interactive Fun</h2>
        <p className="opacity-60">A little bit of play for the special day</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy size={20} className="text-yellow-500" /> Pop it!</h3>
          <BalloonPop />
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Sparkles size={20} className="text-blue-400" /> Memory Flip</h3>
          <MemoryGame />
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🎁 Daily Wish</h3>
          <WishGenerator />
        </div>
      </div>
    </section>
  );
}
