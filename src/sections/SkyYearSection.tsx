import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import StarField from '@/components/StarField';
import FloatingParticles from '@/components/FloatingParticles';

interface WishStar {
  id: number;
  label: string;
  message: string;
  x: string;
  y: string;
  size: number;
}

const WISH_STARS: WishStar[] = [
  { id: 1, label: 'Happiness', message: 'May you find plenty of little reasons to smile, even on ordinary days.', x: '15%', y: '20%', size: 32 },
  { id: 2, label: 'Adventure', message: 'May you discover new places, new experiences and stories worth telling.', x: '70%', y: '15%', size: 28 },
  { id: 3, label: 'Success', message: "May all your hard work slowly turn into something you're proud of.", x: '40%', y: '35%', size: 36 },
  { id: 4, label: 'Peace', message: 'May you have quiet moments where everything feels exactly right.', x: '85%', y: '45%', size: 26 },
  { id: 5, label: 'Good People', message: 'May you always be surrounded by people who genuinely care about you.', x: '20%', y: '55%', size: 30 },
  { id: 6, label: 'Beautiful Surprises', message: 'Because some of the best memories are the ones we never planned.', x: '60%', y: '65%', size: 34 },
];

export default function SkyYearSection() {
  const [activeStar, setActiveStar] = useState<WishStar | null>(null);

  return (
    <section
      id="sky-year"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #F4F0FA 0%, #EDE6F6 50%, #F0EAF8 100%)',
      }}
    >
      <StarField count={40} seed={33} />
      <FloatingParticles count={12} seed={5} />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          If This Year Were A Sky...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-center text-sm text-muted-purple sm:text-base"
        >
          Each star holds a wish. Tap one to reveal it.
        </motion.p>

        {/* Star constellation */}
        <div className="relative mt-12 h-[400px] w-full sm:h-[450px]">
          {/* Connecting lines (SVG) */}
          <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
            <motion.path
              d="M 15% 20% L 40% 35% M 40% 35% L 70% 15% M 40% 35% L 85% 45% M 15% 20% L 20% 55% M 20% 55% L 60% 65% M 60% 65% L 85% 45%"
              stroke="rgba(139, 111, 174, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>

          {WISH_STARS.map((star, i) => (
            <motion.button
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15, type: 'spring' }}
              onClick={() => setActiveStar(star)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="group absolute flex flex-col items-center gap-1"
              style={{ left: star.x, top: star.y, transform: 'translate(-50%, -50%)' }}
            >
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-500 ${
                  activeStar?.id === star.id
                    ? 'bg-champagne/30'
                    : 'bg-dusty-purple/10 group-hover:bg-dusty-purple/20'
                }`}
                style={{
                  width: star.size * 2,
                  height: star.size * 2,
                  filter: activeStar?.id === star.id
                    ? 'drop-shadow(0 0 15px rgba(232, 201, 138, 0.8))'
                    : 'drop-shadow(0 0 5px rgba(139, 111, 174, 0.3))',
                }}
              >
                <Star
                  size={star.size}
                  className={`transition-colors duration-500 ${
                    activeStar?.id === star.id
                      ? 'fill-champagne text-champagne'
                      : 'fill-dusty-purple/30 text-dusty-purple/40 group-hover:fill-dusty-purple/50'
                  }`}
                />
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${
                activeStar?.id === star.id ? 'text-dusty-purple' : 'text-muted-purple'
              }`}>
                {star.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Message display */}
        <AnimatePresence mode="wait">
          {activeStar && (
            <motion.div
              key={activeStar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-8 max-w-lg rounded-2xl border border-champagne/30 bg-cream/80 px-6 py-5 text-center backdrop-blur-sm shadow-lg shadow-champagne/10"
            >
              <p className="font-serif text-lg text-dusty-purple">{activeStar.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-purple sm:text-base">
                {activeStar.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
