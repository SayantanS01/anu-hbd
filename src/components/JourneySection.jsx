import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School, Baby, Compass } from 'lucide-react';

export default function JourneySection() {
  const milestones = [
    {
      year: "The Beginning",
      title: "The First Chapter",
      description: "A journey of a thousand miles begins with a single step. From those early days of curiosity and wonder, the foundation of an amazing person was built.",
      icon: <Baby size={32} />,
    },
    {
      year: "The School Years",
      title: "Growth & Discovery",
      description: "Through the halls of learning, you've grown not just in knowledge, but in character. Every challenge faced was a lesson learned, and every friendship made was a memory kept.",
      icon: <School size={32} />,
    },
    {
      year: "2024",
      title: "The Grand Milestone",
      description: "This year marks the end of a beautiful chapter. Passing out of school isn't just a graduation; it's the moment you step into the world as a person of excellence. We are so proud of your journey.",
      icon: <GraduationCap size={32} />,
    },
    {
      year: "The Future",
      title: "New Horizons",
      description: "The world is your canvas now. As you move forward, remember the lessons of the past and the excitement of the unknown. Your story is just beginning.",
      icon: <Compass size={32} />,
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-birthday-pink font-bold tracking-[0.6em] uppercase text-xs mb-4 block"
        >
          A Lifetime in the Making
        </motion.span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-serif italic text-birthday-text">
          The Journey
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-birthday-pink/30 hidden md:block" />

        <div className="space-y-32">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex p-4 rounded-3xl bg-birthday-pink text-birthday-light shadow-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-birthday-pink mb-2">{item.year}</h3>
                <h4 className="text-4xl font-black mb-6 tracking-tight text-birthday-text">
                  {item.title}
                </h4>
                <p className="text-lg text-birthday-text/80 leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                  {item.description}
                </p>
              </div>

              <div className="hidden md:flex w-12 h-12 rounded-full glass border border-birthday-pink/50 z-10 items-center justify-center bg-birthday-light">
                <div className="w-2 h-2 rounded-full bg-birthday-pink animate-ping" />
              </div>

              <div className="flex-1 hidden md:block">
                <div className="w-full h-[300px] rounded-[3rem] glass border border-birthday-pink/10 flex items-center justify-center">
                  <div className="text-birthday-pink opacity-20 scale-150 rotate-12">
                    {item.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
