import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import Moon from '@/components/Moon';
import FloatingParticles from '@/components/FloatingParticles';

export default function FinalSection() {
  return (
    <section
      id="final"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #D8D0EA 0%, #CFC6E4 25%, #C9BFE0 50%, #C5BADC 100%)',
      }}
    >
      <StarField count={100} seed={111} />
      <FloatingParticles count={20} seed={17} />

      {/* Large crescent moon */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="pointer-events-none absolute top-[8%] right-[8%] sm:right-[12%]"
      >
        <Moon size={160} />
      </motion.div>

      {/* Moon glow */}
      <div className="pointer-events-none absolute top-[10%] right-[10%] h-80 w-80 rounded-full bg-champagne/10 blur-3xl" />

      {/* Stars that slowly appear */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => {
          const rand = (n: number) => ((Math.sin(n * 9301 + 49297) % 233280) / 233280 + 1) % 1;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${rand(i) * 100}%`,
                left: `${rand(i + 50) * 100}%`,
                width: `${1 + rand(i + 100) * 2}px`,
                height: `${1 + rand(i + 100) * 2}px`,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 + rand(i) * 3 }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm font-medium tracking-wide text-muted-purple sm:text-base"
        >
          And before you go...
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 font-serif text-4xl leading-tight text-deep-plum sm:text-5xl md:text-6xl"
        >
          Happy Birthday, Shandhini. <span className="text-3xl sm:text-4xl">🎂</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-sm leading-relaxed text-muted-purple sm:text-base"
        >
          I hope this little website made you smile, even just for a moment.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-muted-purple sm:text-base"
        >
          May the coming year bring you happiness, unexpected good news, beautiful memories, and countless reasons to smile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 font-serif text-lg text-dusty-purple sm:text-xl"
        >
          <p>Keep shining.</p>
          <p>Keep laughing.</p>
          <p>Keep being you.</p>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 font-serif text-2xl text-deep-plum sm:text-3xl md:text-4xl"
        >
          Have the most beautiful year ahead. <span className="text-champagne">✨</span>
        </motion.h3>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 border-t border-dusty-purple/15 pt-6 text-center"
        >
          <p className="text-xs text-muted-purple/80">
            Made with a little creativity and a lot of birthday wishes.
          </p>
          <p className="mt-1.5 font-serif text-sm italic text-dusty-purple">
            — Gokul
          </p>
        </motion.div>
      </div>
    </section>
  );
}
