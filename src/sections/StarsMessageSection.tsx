import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import StarField from '@/components/StarField';
import Moon from '@/components/Moon';
import FloatingParticles from '@/components/FloatingParticles';
import SparkleBurst from '@/components/SparkleBurst';

interface MessageStar {
  id: number;
  x: string;
  y: string;
  size: number;
  message: string;
  delay: string;
  floatDelay: string;
}

const STAR_MESSAGES: string[] = [
  'Keep being the person you are. The right people will always appreciate it. ✨',
  "Don't forget to enjoy the little things. Sometimes they become the best memories.",
  'You deserve to celebrate yourself today — and every achievement that brought you here. 🎂',
  "I hope this year gives you at least one moment that turns into your favourite memory.",
  'Some of the best things in life arrive when we least expect them. Maybe this year has a few waiting for you. ✦',
  "Take chances, laugh loudly, and don't overthink every little thing.",
  'May this year introduce you to beautiful places, good people and unexpected happiness.',
  'Whatever happens next, I hope you always find a reason to smile.',
  'A new year of your life has started. Make it a story worth remembering. 🌙',
  'And remember — if you ever need anything, feel free to reach out.',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function StarsMessageSection() {
  const [discovered, setDiscovered] = useState<Set<number>>(new Set());
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });

  const stars = useMemo<MessageStar[]>(() => {
    const rand = seededRandom(202);
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: `${8 + rand() * 84}%`,
      y: `${12 + rand() * 70}%`,
      size: 18 + rand() * 14,
      message: STAR_MESSAGES[i],
      delay: `${rand() * 3}s`,
      floatDelay: `${rand() * 4}s`,
    }));
  }, []);

  const allDiscovered = discovered.size === STAR_MESSAGES.length;

  const handleStarClick = useCallback(
    (e: React.MouseEvent, star: MessageStar) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setBurstPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setBurstTrigger((t) => t + 1);
      setActiveMessage(star.message);
      setDiscovered((prev) => new Set(prev).add(star.id));
    },
    []
  );

  return (
    <section
      id="stars-message"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #F4F0FA 0%, #EDE6F6 40%, #E8E1F5 100%)',
      }}
    >
      <StarField count={50} seed={202} />
      <FloatingParticles count={14} seed={21} />

      {/* Large glowing crescent moon in background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="pointer-events-none absolute top-[10%] right-[8%]"
      >
        <Moon size={200} />
      </motion.div>
      <div className="pointer-events-none absolute top-[12%] right-[10%] h-72 w-72 rounded-full bg-champagne/8 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          A Little Message From The Stars <span className="text-champagne">✦</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 text-center text-sm leading-relaxed text-muted-purple sm:text-base"
        >
          <p>Some messages are meant to be found at just the right moment.</p>
          <p className="mt-2 font-serif text-lg text-dusty-purple sm:text-xl">
            Pick a star and see what it has to say.
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-dusty-purple/15 bg-cream/60 px-4 py-1.5 backdrop-blur-sm">
            <Star size={14} className="text-champagne" />
            <span className="text-sm font-medium text-muted-purple">
              Stars discovered: {discovered.size} / {STAR_MESSAGES.length}
            </span>
          </div>
        </motion.div>

        {/* Interactive star field */}
        <div className="relative mt-8 h-[380px] w-full rounded-3xl border border-dusty-purple/10 bg-cream/15 backdrop-blur-sm sm:h-[440px]">
          {stars.map((star) => {
            const found = discovered.has(star.id);
            return (
              <motion.button
                key={star.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + star.id * 0.06, type: 'spring' }}
                onClick={(e) => handleStarClick(e, star)}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.85 }}
                className="group absolute"
                style={{ left: star.x, top: star.y, transform: 'translate(-50%, -50%)' }}
                aria-label="Reveal a hidden message"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + star.id * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: parseFloat(star.floatDelay),
                  }}
                >
                  <Star
                    size={star.size}
                    className={`transition-all duration-300 animate-twinkle ${
                      found
                        ? 'fill-champagne/70 text-champagne'
                        : 'fill-dusty-purple/20 text-dusty-purple/40 group-hover:fill-champagne/50 group-hover:text-champagne'
                    }`}
                    style={{
                      filter: found
                        ? 'drop-shadow(0 0 12px rgba(232, 201, 138, 0.8))'
                        : 'drop-shadow(0 0 6px rgba(139, 111, 174, 0.3))',
                      animationDelay: star.delay,
                    }}
                  />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Completion message */}
        <AnimatePresence>
          {allDiscovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 text-center"
            >
              <h3 className="font-serif text-2xl text-dusty-purple sm:text-3xl">
                You found every little message hidden in the sky. ✨
              </h3>
              <p className="mt-4 max-w-lg mx-auto text-sm leading-relaxed text-muted-purple sm:text-base">
                Maybe that's what birthdays are for — discovering a few beautiful things waiting for you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message modal */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-deep-plum/30 backdrop-blur-sm px-6"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md rounded-3xl border border-champagne/30 bg-cream p-8 text-center shadow-2xl shadow-dusty-purple/20 sm:p-10"
            >
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-purple transition-colors hover:bg-lavender hover:text-dusty-purple"
                aria-label="Close message"
              >
                <X size={16} />
              </button>

              {/* Decorative star */}
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
                <Star size={28} className="fill-champagne/40 text-champagne animate-gentle-pulse" />
              </div>

              <p className="font-serif text-lg leading-relaxed text-deep-plum sm:text-xl">
                {activeMessage}
              </p>

              <button
                onClick={() => setActiveMessage(null)}
                className="mt-6 rounded-full border border-dusty-purple/20 bg-lavender/50 px-6 py-2.5 text-sm font-medium text-dusty-purple transition-colors hover:bg-lavender"
              >
                Continue exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SparkleBurst x={burstPos.x} y={burstPos.y} trigger={burstTrigger} count={12} />
    </section>
  );
}
