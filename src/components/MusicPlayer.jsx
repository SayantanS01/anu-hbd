import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import useStore from '../store/useStore';

export default function MusicPlayer() {
  const { musicUrl, isMuted, volume, toggleMute, setVolume, isPlaying, setIsPlaying, isExperienceStarted } = useStore();
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      
      if (isExperienceStarted && isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [volume, isMuted, isPlaying, isExperienceStarted]);

  return (
    <div className="fixed top-6 right-4 md:top-auto md:bottom-8 md:right-8 z-[60] flex items-center gap-4 scale-90 sm:scale-100 origin-right">
      <audio 
        ref={audioRef} 
        src={musicUrl || '/music/default.mp3'} 
        loop 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-2 glass px-4 py-2 rounded-full shadow-2xl overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-birthday-pink text-white rounded-full shadow-lg"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] uppercase tracking-tighter opacity-50 font-bold">Now Playing</span>
          <span className="text-xs font-medium max-w-[100px] truncate">Birthday Vibes</span>
        </div>

        <div className="h-8 w-[1px] bg-white/20 mx-2" />

        <div className="flex items-center gap-2 relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={toggleMute}
            onMouseEnter={() => setShowVolume(true)}
            className="p-2 text-gray-500 hover:text-birthday-pink"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>

          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onMouseLeave={() => setShowVolume(false)}
                className="absolute right-12 bg-white/10 backdrop-blur-xl p-2 rounded-lg flex items-center gap-2 border border-white/20"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 accent-birthday-pink"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Animated visualizer icon */}
      <motion.div 
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="p-4 bg-white/10 glass rounded-full shadow-lg text-birthday-pink"
      >
        <Music size={24} />
      </motion.div>
    </div>
  );
}
