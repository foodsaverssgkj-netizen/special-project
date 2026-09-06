import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import Clouds from '@/components/Clouds';
import FloatingParticles from '@/components/FloatingParticles';

const FLOAT_WORDS = [
  { icon: '✨', label: 'Dream', delay: 0 },
  { icon: '🌙', label: 'Explore', delay: 0.5 },
  { icon: '⭐', label: 'Enjoy', delay: 1 },
];

export default function NewChapterSection() {
  return (
    <section
      id="new-chapter"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #E8E1F5 0%, #EDE6F6 40%, #F0EAF8 100%)',
      }}
    >
      <StarField count={45} seed={303} />
      <FloatingParticles count={12} seed={31} />

      {/* Moon rising from behind clouds */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl">
        {/* Clouds at the base */}
        <div className="relative bottom-0 flex justify-center">
          <Clouds count={3} seed={25} />
        </div>

        {/* Moon rising animation */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div
            className="h-28 w-28 rounded-full bg-gradient-to-br from-cream via-champagne/40 to-champagne/20 animate-moon-breathe"
            style={{ boxShadow: '0 0 50px rgba(232, 201, 138, 0.3)' }}
          />
        </motion.div>

        {/* Cloud silhouettes in front of moon */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full">
          <svg width="100%" height="60" viewBox="0 0 600 60" fill="none" className="opacity-30">
            <ellipse cx="200" cy="50" rx="80" ry="18" fill="#FFFDF8" />
            <ellipse cx="320" cy="45" rx="70" ry="20" fill="#FFFDF8" />
            <ellipse cx="420" cy="50" rx="60" ry="16" fill="#FFFDF8" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          For Your New Chapter
        </motion.h2>

        <div className="mt-10 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-2xl text-dusty-purple sm:text-3xl"
          >
            Another year.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-serif text-2xl text-dusty-purple sm:text-3xl"
          >
            Another chapter.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-sm leading-relaxed text-muted-purple sm:text-base"
          >
            More stories waiting to happen.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="max-w-lg text-sm leading-relaxed text-muted-purple sm:text-base"
          >
            I hope this next chapter brings you everything worth looking forward to.
          </motion.p>
        </div>

        {/* Floating glowing words */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {FLOAT_WORDS.map((word, i) => (
            <motion.div
              key={word.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 2.2 + i * 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: word.delay,
                }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-2xl sm:text-3xl">{word.icon}</span>
                <span
                  className="font-serif text-lg text-dusty-purple sm:text-xl"
                  style={{ textShadow: '0 0 12px rgba(232, 201, 138, 0.4)' }}
                >
                  {word.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
