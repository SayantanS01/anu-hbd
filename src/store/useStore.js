import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useStore = create((set, get) => ({
  // Theme state
  theme: 'dark',
  setTheme: async (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
    await get().saveToSupabase();
  },

  // Identity state
  birthdayName: "Anusmita",
  setBirthdayName: (name) => set({ birthdayName: name }),

  // Message state
  message: "Even though we don’t know each other very well, I just wanted to wish you a very happy birthday. May your day be filled with joy and your year with success!",
  setMessage: (message) => set({ message }),

  // Gallery state
  images: [],
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  removeImage: (index) => set((state) => ({ images: state.images.filter((_, i) => i !== index) })),
  setImages: (images) => set({ images }),

  // Music state
  musicUrl: '',
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

  // --- Database Logic ---

  // Fetch initial config from Supabase
  fetchConfig: async () => {
    const { data, error } = await supabase
      .from('birthday_config')
      .select('*')
      .eq('id', 1)
      .single();

    if (data && !error) {
      set({
        theme: data.theme || 'dark',
        birthdayName: data.birthday_name || 'Anusmita',
        message: data.message || '',
        images: data.images || [],
        musicUrl: data.music_url || '',
      });
      document.documentElement.setAttribute('data-theme', data.theme || 'dark');
    }
  },

  // Save current state to Supabase
  saveToSupabase: async () => {
    const state = get();
    const { error } = await supabase
      .from('birthday_config')
      .upsert({
        id: 1,
        theme: state.theme,
        birthday_name: state.birthdayName,
        message: state.message,
        images: state.images,
        music_url: state.musicUrl,
        updated_at: new Date(),
      });

    if (error) {
      console.error('Error saving to Supabase:', error);
      throw error;
    }
  },

  // Reset functionality (Clears DB record 1)
  resetStore: async () => {
    const confirm = window.confirm("This will clear the database. Are you sure?");
    if (confirm) {
      await supabase.from('birthday_config').delete().eq('id', 1);
      window.location.reload();
    }
  }
}));

export default useStore;
