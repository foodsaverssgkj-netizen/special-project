import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import StarField from '@/components/StarField';
import FloatingParticles from '@/components/FloatingParticles';

const WISHES: string[] = [
  'May this year surprise you in the best possible ways.',
  'May you laugh more than you expected to.',
  "May something you've been waiting for finally happen.",
  'May you meet opportunities that take you somewhere wonderful.',
  'May your ordinary days become unexpectedly beautiful.',
  "May you have more moments where you stop and think, \"I'm really happy right now.\"",
  'May this be one of those years you\'ll look back on and smile about.',
];

export default function WishGeneratorSection() {
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [wishIndex, setWishIndex] = useState<number>(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const revealWish = useCallback(() => {
    setIsAnimating(true);
    let count = 0;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * WISHES.length);
      setCurrentWish(WISHES[idx]);
      setWishIndex(idx);
      count++;
      if (count > 8) {
        clearInterval(interval);
        let finalIdx = Math.floor(Math.random() * WISHES.length);
        // Avoid repeating the same wish
        if (WISHES[finalIdx] === currentWish && WISHES.length > 1) {
          finalIdx = (finalIdx + 1) % WISHES.length;
        }
        setCurrentWish(WISHES[finalIdx]);
        setWishIndex(finalIdx);
        setIsAnimating(false);
      }
    }, 80);
  }, [currentWish]);

  return (
    <section
      id="wish-generator"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #F4F0FA 0%, #EDE6F6 50%, #F0EAF8 100%)',
      }}
    >
      <StarField count={35} seed={66} />
      <FloatingParticles count={10} seed={9} />

      {/* Glow circle */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/8 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          Let's Pick A Wish For Your Year
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-sm text-muted-purple sm:text-base"
        >
          One click, one wish. Let's see what the stars have in store.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={revealWish}
          disabled={isAnimating}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-dusty-purple to-dusty-purple/80 px-8 py-3.5 font-medium text-cream shadow-lg shadow-dusty-purple/30 transition-all hover:shadow-xl hover:shadow-dusty-purple/40 disabled:opacity-70"
        >
          <Sparkles size={16} className="text-champagne" />
          <span>Reveal My Wish</span>
          <Sparkles size={16} className="text-champagne transition-transform group-hover:rotate-180" />
        </motion.button>

        {/* Wish display */}
        <div className="mt-10 min-h-[120px] w-full">
          <AnimatePresence mode="wait">
            {currentWish && (
              <motion.div
                key={wishIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative mx-auto max-w-lg rounded-2xl border border-champagne/30 bg-cream px-8 py-6 shadow-lg shadow-champagne/10"
              >
                {/* Decorative quotes */}
                <span className="absolute -top-4 left-6 font-serif text-4xl text-champagne/40">"</span>
                <span className="absolute -bottom-8 right-6 font-serif text-4xl text-champagne/40">"</span>

                <p className={`font-serif text-lg leading-relaxed text-deep-plum sm:text-xl ${
                  isAnimating ? 'opacity-50' : 'opacity-100'
                } transition-opacity`}>
                  {currentWish}
                </p>

                {/* Stars under wish */}
                <div className="mt-4 flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Sparkles size={12} className="text-champagne" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
