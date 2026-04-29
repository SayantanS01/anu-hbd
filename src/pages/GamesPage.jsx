import React from 'react';
import { motion } from 'framer-motion';
import Games from '../components/Games';

export default function GamesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      <Games />
    </motion.div>
  );
}
