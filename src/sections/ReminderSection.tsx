import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import Moon from '@/components/Moon';
import FloatingParticles from '@/components/FloatingParticles';

export default function ReminderSection() {
  return (
    <section
      id="reminder"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #F0EAF8 0%, #EDE6F6 40%, #E8E1F5 100%)',
      }}
    >
      <StarField count={50} seed={77} />
      <FloatingParticles count={14} seed={11} />

      {/* Large moon */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="pointer-events-none absolute top-[10%] left-[5%] sm:left-[10%]"
      >
        <Moon size={180} />
      </motion.div>

      {/* Moon glow */}
      <div className="pointer-events-none absolute top-[12%] left-[8%] h-72 w-72 rounded-full bg-champagne/8 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          One Small Reminder
        </motion.h2>

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted-purple sm:text-base">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            You don't have to have everything figured out.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            You don't have to make every day perfect.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Sometimes, growing, learning, laughing and simply moving forward is more than enough.
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-lg text-sm leading-relaxed text-muted-purple sm:text-base"
        >
          So wherever this year takes you, I hope you remember to enjoy the little things along the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10"
        >
          <p className="font-serif text-2xl text-dusty-purple sm:text-3xl md:text-4xl">
            Your story is still being written.
          </p>
          <p className="mt-2 text-2xl text-champagne">✨</p>
        </motion.div>
      </div>
    </section>
  );
}
