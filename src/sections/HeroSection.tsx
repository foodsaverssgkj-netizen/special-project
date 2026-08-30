import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import StarField from '@/components/StarField';
import Moon from '@/components/Moon';
import FloatingParticles from '@/components/FloatingParticles';
import Clouds from '@/components/Clouds';

interface HeroSectionProps {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #E8E1F5 0%, #F4F0FA 40%, #F0EAF8 70%, #EDE6F6 100%)',
      }}
    >
      {/* Background layers */}
      <StarField count={80} withShootingStars seed={42} />
      <FloatingParticles count={15} seed={3} />
      <Clouds count={2} seed={10} />

      {/* Moon glow circles */}
      <div className="pointer-events-none absolute top-[8%] right-[10%] h-64 w-64 rounded-full bg-champagne/8 blur-3xl" />
      <div className="pointer-events-none absolute top-[15%] right-[15%] h-96 w-96 rounded-full bg-champagne/5 blur-3xl" />

      {/* Crescent moon */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        className="absolute top-[8%] right-[6%] sm:right-[10%] md:right-[14%]"
      >
        <Moon size={140} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-dusty-purple/20 bg-cream/50 px-4 py-1.5 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-champagne" />
          <span className="text-sm font-medium tracking-wide text-muted-purple">
            A Little Something For You
          </span>
          <Sparkles size={14} className="text-champagne" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-4xl leading-tight text-deep-plum sm:text-5xl md:text-6xl"
        >
          Hey Shandhini,
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 font-serif text-xl leading-relaxed text-dusty-purple sm:text-2xl md:text-3xl"
        >
          Tonight, the stars have something to say...
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-4 max-w-md text-sm leading-relaxed text-muted-purple sm:text-base"
        >
          So before you continue, take a little moment for yourself.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          onClick={onEnter}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-dusty-purple to-dusty-purple/80 px-8 py-3.5 font-medium text-cream shadow-lg shadow-dusty-purple/30 transition-all hover:shadow-xl hover:shadow-dusty-purple/40 animate-glow-pulse"
        >
          <span className="text-base">Enter the Moonlight</span>
          <span className="text-champagne transition-transform group-hover:translate-x-1">✦</span>
        </motion.button>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-muted-purple/60">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-dusty-purple/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
