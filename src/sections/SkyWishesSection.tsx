import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import StarField from '@/components/StarField';
import FloatingParticles from '@/components/FloatingParticles';
import SparkleBurst from '@/components/SparkleBurst';

interface WishStar {
  id: number;
  x: string;
  y: string;
  size: number;
  message: string;
  twinkle: boolean;
  delay: string;
}

const MESSAGES: string[] = [
  'Keep smiling.',
  'Good things are coming.',
  'Take more chances.',
  'Enjoy the little moments.',
  'You deserve a beautiful year.',
  "Don't forget to celebrate yourself.",
  'More adventures ahead.',
  'Keep shining.',
  'This year is yours.',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function SkyWishesSection() {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 });

  const stars = useMemo<WishStar[]>(() => {
    const rand = seededRandom(88);
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: `${8 + rand() * 84}%`,
      y: `${10 + rand() * 75}%`,
      size: 14 + rand() * 16,
      message: MESSAGES[i % MESSAGES.length],
      twinkle: rand() > 0.4,
      delay: `${rand() * 3}s`,
    }));
  }, []);

  const handleStarClick = useCallback((e: React.MouseEvent, star: WishStar) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBurstPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setBurstTrigger((t) => t + 1);
    setActiveMessage(star.message);
  }, []);

  return (
    <section
      id="sky-wishes"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #E8E1F5 0%, #EDE6F6 40%, #F4F0FA 100%)',
      }}
    >
      <StarField count={60} seed={99} />
      <FloatingParticles count={15} seed={13} />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          A Sky Full Of Wishes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-center text-sm text-muted-purple sm:text-base"
        >
          Tap the stars to uncover little wishes for your year.
        </motion.p>

        {/* Interactive star field */}
        <div className="relative mt-10 h-[420px] w-full rounded-3xl border border-dusty-purple/10 bg-cream/20 backdrop-blur-sm sm:h-[480px]">
          {stars.map((star) => (
            <motion.button
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + star.id * 0.05, type: 'spring' }}
              onClick={(e) => handleStarClick(e, star)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.85 }}
              className="group absolute"
              style={{ left: star.x, top: star.y, transform: 'translate(-50%, -50%)' }}
              aria-label="Reveal a wish"
            >
              <Star
                size={star.size}
                className={`text-champagne fill-champagne/20 transition-all duration-300 group-hover:fill-champagne/60 group-hover:text-champagne ${
                  star.twinkle ? 'animate-twinkle' : ''
                }`}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(232, 201, 138, 0.4))',
                  animationDelay: star.delay,
                }}
              />
            </motion.button>
          ))}

          {/* Message overlay */}
          <AnimatePresence>
            {activeMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 left-1/2 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-champagne/30 bg-cream/90 px-6 py-4 text-center shadow-xl shadow-champagne/15 backdrop-blur-md"
              >
                <p className="font-serif text-lg text-dusty-purple">{activeMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SparkleBurst x={burstPos.x} y={burstPos.y} trigger={burstTrigger} count={10} />
    </section>
  );
}
