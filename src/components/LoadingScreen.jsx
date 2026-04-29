import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-birthday-light"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-6xl mb-8"
      >
        🎂
      </motion.div>
      <motion.div
        className="w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-birthday-pink dark:bg-neon-accent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.p
        className="mt-4 text-birthday-text dark:text-white font-medium tracking-widest uppercase text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Preparing the Magic...
      </motion.p>
    </motion.div>
  );
}
