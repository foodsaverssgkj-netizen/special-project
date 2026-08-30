import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import StarField from '@/components/StarField';
import Moon from '@/components/Moon';
import FloatingParticles from '@/components/FloatingParticles';
import SparkleBurst from '@/components/SparkleBurst';

export default function RevealSection() {
  const [wishClicked, setWishClicked] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });

  const handleWish = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBurstPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setBurstTrigger((t) => t + 1);
    setWishClicked(true);
  }, []);

  return (
    <section
      id="reveal"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EDE6F6 0%, #F4F0FA 30%, #F4F0FA 70%, #F0EAF8 100%)',
      }}
    >
      <StarField count={50} seed={55} />
      <FloatingParticles count={12} seed={8} />

      {/* Large moon behind content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Moon size={320} glow={false} />
      </motion.div>

      {/* Moon glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/8 blur-3xl" />

      {/* Champagne sparkles around heading */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 180;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(42% + ${Math.sin(angle) * radius}px)`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              <Sparkles size={16} className="text-champagne" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-serif text-4xl leading-tight text-deep-plum sm:text-5xl md:text-6xl"
        >
          Happy Birthday,
          <br />
          <span className="champagne-shimmer font-serif italic">Shandhini!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 font-serif text-lg leading-relaxed text-dusty-purple sm:text-xl"
        >
          May your day be as lovely as a sky full of stars.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-lg space-y-4 text-sm leading-relaxed text-muted-purple sm:text-base"
        >
          <p>Today isn't just another day on the calendar.</p>
          <p>It's a little reminder that someone wonderful deserves to be celebrated.</p>
          <p className="font-serif text-base text-deep-plum sm:text-lg">
            So here's a tiny corner of the internet made especially to wish you a beautiful birthday.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          onClick={handleWish}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-cream px-8 py-3.5 font-medium text-dusty-purple shadow-lg shadow-champagne/20 transition-all hover:shadow-xl hover:shadow-champagne/30"
        >
          <Sparkles size={16} className="text-champagne" />
          <span>Make a Wish</span>
          <Sparkles size={16} className="text-champagne" />
        </motion.button>

        <AnimatePresence>
          {wishClicked && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 font-serif text-lg italic text-dusty-purple"
            >
              "Now make a really good one."
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <SparkleBurst x={burstPos.x} y={burstPos.y} trigger={burstTrigger} count={16} />
    </section>
  );
}
