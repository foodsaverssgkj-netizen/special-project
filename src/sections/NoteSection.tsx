import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import FloatingParticles from '@/components/FloatingParticles';

export default function NoteSection() {
  return (
    <section
      id="note"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #F0EAF8 0%, #F4F0FA 50%, #F4F0FA 100%)',
      }}
    >
      <StarField count={30} seed={22} />
      <FloatingParticles count={10} seed={12} />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="rounded-3xl border border-dusty-purple/10 bg-cream p-8 shadow-2xl shadow-dusty-purple/10 sm:p-12 md:p-16"
        >
          {/* Decorative corner sparkles */}
          <div className="absolute -top-3 -left-3 h-6 w-6">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-champagne">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <div className="absolute -bottom-3 -right-3 h-6 w-6">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-soft-peach">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="currentColor" opacity="0.6" />
            </svg>
          </div>

          <h2 className="text-center font-serif text-3xl text-deep-plum sm:text-4xl">
            A Little Birthday Note
          </h2>

          <div className="mt-8 space-y-5 text-center text-sm leading-relaxed text-muted-purple sm:text-base">
            <p className="font-serif text-lg text-deep-plum sm:text-xl">Shandhini,</p>

            <p>
              I hope this birthday brings you the kind of happiness that stays long after the candles are gone.
            </p>

            <p>
              I hope you find more reasons to laugh, more moments worth remembering, more little surprises, and more days that simply feel right.
            </p>

            <p>
              May this new year of your life bring you closer to the things you dream about and give you plenty of reasons to be proud of how far you've come.
            </p>

            <p>
              And most importantly, I hope you keep being exactly who you are.
            </p>

            <p className="font-serif text-lg text-dusty-purple sm:text-xl">
              Have a beautiful birthday. <span className="text-champagne">✨</span>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 border-t border-dusty-purple/10 pt-6 text-center"
          >
            <p className="text-sm italic text-muted-purple">
              — From someone who wanted to make your birthday a little more special
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
