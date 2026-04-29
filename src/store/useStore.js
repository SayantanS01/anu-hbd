import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Theme state
      theme: 'dark',
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      // Identity state
      birthdayName: "Anushmita",
      setBirthdayName: (name) => set({ birthdayName: name }),

      // Message state
      message: "Even though we don’t know each other much, I just wanted to wish you a very happy birthday. May your day be filled with joy and your year with success!",
      setMessage: (message) => set({ message }),

      // Gallery state (Using your uploaded images)
      images: [
        '/images/477450610_1100753825134031_5509271399192773941_n.jpg',
        '/images/481923831_1117734283435985_3714343966933150254_n.jpg',
        '/images/549234067_1263048145571264_8457417335223303509_n.jpg',
        '/images/558864974_1278779587331453_1831040692694396925_n.jpg',
        '/images/567801616_1290536182822460_9217930326138226861_n.jpg',
        '/images/655502893_1406773891198688_4534529526645753491_n.jpg',
      ],
      addImage: (image) => set((state) => ({ images: [...state.images, image] })),
      removeImage: (index) => set((state) => ({ images: state.images.filter((_, i) => i !== index) })),
      setImages: (images) => set({ images }),

      // Music state (Using your uploaded song)
      musicUrl: '/music/Nicky Youre, dazy - Sunroof (Official Music Video).mp3',
      isMuted: false,
      isPlaying: false,
      volume: 0.5,
      setMusicUrl: (url) => set({ musicUrl: url }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setVolume: (volume) => set({ volume }),

      // Global Experience State
      isExperienceStarted: false,
      startExperience: () => set({ isExperienceStarted: true, isPlaying: true }),

      // Reset functionality
      resetStore: () => {
        localStorage.removeItem('birthday-storage');
        window.location.reload();
      }
    }),
    {
      name: 'birthday-storage',
    }
  )
);

export default useStore;
