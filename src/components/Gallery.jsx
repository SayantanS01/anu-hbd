import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import useStore from '../store/useStore';

export default function Gallery() {
  const images = useStore((state) => state.images);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const nextImage = () => {
    const next = (currentIndex + 1) % images.length;
    setCurrentIndex(next);
    setSelectedImage(images[next]);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prev);
    setSelectedImage(images[prev]);
  };

  return (
    <section className="py-32 px-4 max-w-[1800px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-24 relative"
      >
        <span className="text-birthday-pink font-bold tracking-[0.6em] uppercase text-xs mb-4 block">Capturing Brilliance</span>
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase font-serif italic mb-8">
          The Gallery
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % 3) * 0.2 }}
            whileHover={{ scale: 0.98 }}
            className={`group relative overflow-hidden glass cursor-pointer rounded-[2rem] shadow-2xl bg-black/5 dark:bg-white/5 ${
              index % 4 === 0 ? 'md:col-span-2 md:h-[600px]' : 'h-[400px]'
            }`}
            onClick={() => openLightbox(index)}
          >
            <img 
              src={img} 
              alt={`Capture ${index}`} 
              className="w-full h-full object-contain p-4 grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
              <div className="flex items-center gap-4 text-white">
                <Camera size={24} />
                <span className="text-sm font-bold tracking-widest uppercase">YOU #{index + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4"
          >
            <button className="absolute top-12 right-12 text-white/50 hover:text-white p-2 z-[110]" onClick={() => setSelectedImage(null)}>
              <X size={48} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <button className="absolute left-8 text-white/30 hover:text-white p-4" onClick={prevImage}>
                <ChevronLeft size={80} strokeWidth={1} />
              </button>

              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-7xl w-full max-h-[85vh] relative">
                <img src={selectedImage} alt="Fullscreen" className="w-full h-full object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)]" />
              </motion.div>

              <button className="absolute right-8 text-white/30 hover:text-white p-4" onClick={nextImage}>
                <ChevronRight size={80} strokeWidth={1} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
