import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Plus, Image as ImageIcon, Music, User, MessageSquare, RotateCcw, Lock, RotateCw } from 'lucide-react';
import useStore from '../store/useStore';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { 
    birthdayName, setBirthdayName,
    message, setMessage,
    images, addImage, removeImage, setImages,
    musicUrl, setMusicUrl,
    resetStore,
    theme,
    saveToSupabase
  } = useStore();

  const [isSaving, setIsSaving] = useState(false);

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      await saveToSupabase();
      alert("🚀 Site Published! Your changes are now live on the cloud.");
    } catch (err) {
      alert("Failed to save to cloud: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password!');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = (index) => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.height;
      canvas.height = img.width;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      
      const rotatedBase64 = canvas.toDataURL('image/jpeg', 0.8);
      const newImages = [...images];
      newImages[index] = rotatedBase64;
      setImages(newImages);
    };
  };

  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // Increased to 10MB as we are more vibrant now
        alert("File is too large! Please use an MP3 under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadstart = () => alert("Uploading... Please wait.");
      reader.onloadend = () => {
        try {
          setMusicUrl(reader.result);
          alert("✅ Music successfully saved to local storage!");
        } catch (e) {
          alert("❌ Storage Full! This song is too large for the browser to save. Please use a smaller MP3 (under 3MB) or a different track.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl max-w-md w-full space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-birthday-pink rounded-full text-black">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-birthday-pink"
            />
            <button type="submit" className="w-full bg-birthday-pink text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-birthday-light pt-32 pb-20 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-birthday-text">Control Center</h1>
            <p className="text-birthday-pink font-bold uppercase text-xs tracking-[0.3em] mt-2">Personalize the experience</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePublish} 
              disabled={isSaving}
              className={`flex items-center gap-2 font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all ${
                isSaving ? 'bg-gray-500 cursor-wait' : 'bg-green-500 hover:scale-105 text-white shadow-lg'
              }`}
            >
              <Save size={18} /> {isSaving ? 'Publishing...' : 'Publish Changes'}
            </button>
            <button onClick={resetStore} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all">
              <RotateCcw size={18} /> Reset All
            </button>
          </div>
        </header>

        {/* Identity Settings */}
        <section className="glass p-8 rounded-[2rem] space-y-6 border-birthday-pink/10">
          <div className="flex items-center gap-3 text-birthday-pink mb-4">
            <User size={24} />
            <h2 className="text-xl font-bold">Identity Settings</h2>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-black text-birthday-text opacity-60">Birthday Name</label>
            <input 
              type="text" 
              value={birthdayName}
              onChange={(e) => setBirthdayName(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-birthday-text/20 rounded-xl px-4 py-3 text-birthday-text focus:outline-none focus:border-birthday-pink font-bold"
            />
          </div>
        </section>

        {/* Message Settings */}
        <section className="glass p-8 rounded-[2rem] space-y-6 border-birthday-pink/10">
          <div className="flex items-center gap-3 text-birthday-pink mb-4">
            <MessageSquare size={24} />
            <h2 className="text-xl font-bold">The Main Message</h2>
          </div>
          <div className="space-y-4">
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-birthday-text/20 rounded-xl px-4 py-3 text-birthday-text focus:outline-none focus:border-birthday-pink font-medium leading-relaxed"
            />
          </div>
        </section>

        {/* Music Settings */}
        <section className="glass p-8 rounded-[2rem] space-y-6 border-birthday-pink/10">
          <div className="flex items-center gap-3 text-birthday-pink mb-4">
            <Music size={24} />
            <h2 className="text-xl font-bold">Background Music</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-birthday-text/60 font-bold uppercase tracking-wider">MP3 File Upload</p>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-dashed border-birthday-text/20 rounded-2xl hover:border-birthday-pink cursor-pointer transition-all bg-black/5 dark:bg-white/5 group">
                <Music className="mb-2 text-birthday-text/40 group-hover:text-birthday-pink transition-colors" />
                <span className="text-sm font-black text-birthday-text/40 group-hover:text-birthday-pink">Choose MP3 File</span>
                <input type="file" accept="audio/mp3" onChange={handleMusicUpload} className="hidden" />
              </label>
            </div>
            {musicUrl && (
              <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg inline-flex">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Active Track Loaded</span>
              </div>
            )}
          </div>
        </section>

        {/* Gallery Settings */}
        <section className="glass p-8 rounded-[2rem] space-y-6 border-birthday-pink/10">
          <div className="flex items-center gap-3 text-birthday-pink mb-4">
            <ImageIcon size={24} />
            <h2 className="text-xl font-bold">Photo Gallery</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div key={i} className="relative group aspect-[3/4] rounded-2xl overflow-hidden border border-birthday-pink/10 shadow-lg bg-black/5 dark:bg-white/5">
                <img src={img} alt="" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-all duration-300">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleRotate(i)}
                      className="p-3 bg-white text-black rounded-full hover:bg-birthday-pink hover:text-white transition-all shadow-xl"
                      title="Rotate 90°"
                    >
                      <RotateCw size={20} />
                    </button>
                    <button 
                      onClick={() => removeImage(i)}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-xl"
                      title="Remove Photo"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <span className="text-[10px] text-white font-black uppercase tracking-widest">Photo #{i + 1}</span>
                </div>
              </div>
            ))}
            <label className="aspect-[3/4] flex flex-col items-center justify-center border-2 border-dashed border-birthday-text/20 rounded-2xl hover:border-birthday-pink cursor-pointer transition-all bg-black/5 dark:bg-white/5 group">
              <Plus size={48} className="text-birthday-text/20 group-hover:text-birthday-pink transition-colors" />
              <span className="text-xs font-black text-birthday-text/20 group-hover:text-birthday-pink mt-2 uppercase tracking-widest">Add Photo</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
