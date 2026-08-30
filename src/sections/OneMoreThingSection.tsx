import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import FloatingParticles from '@/components/FloatingParticles';

// Replace this with your WhatsApp, Instagram, email, or any contact link.
// Leave it empty ("") to hide the contact button entirely.
const CONTACT_LINK = "";

export default function OneMoreThingSection() {
  return (
    <section
      id="one-more-thing"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #E8E1F5 0%, #EDE6F6 40%, #F0EAF8 100%)',
      }}
    >
      <StarField count={35} seed={88} />
      <FloatingParticles count={12} seed={14} />

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Glowing star + constellation above the card */}
        <div className="relative mx-auto mb-6 flex h-20 w-full items-end justify-center">
          {/* Stars */}
          <div className="absolute left-[20%] top-0 h-2 w-2 rounded-full bg-champagne animate-twinkle" style={{ animationDelay: '0.5s', boxShadow: '0 0 8px rgba(232, 201, 138, 0.7)' }} />
          <div className="absolute left-[50%] -top-2 h-2.5 w-2.5 rounded-full bg-champagne animate-twinkle" style={{ animationDelay: '0s', boxShadow: '0 0 10px rgba(232, 201, 138, 0.8)' }} />
          <div className="absolute left-[80%] top-2 h-1.5 w-1.5 rounded-full bg-soft-peach animate-twinkle" style={{ animationDelay: '1s', boxShadow: '0 0 6px rgba(243, 182, 162, 0.7)' }} />
          <div className="absolute left-[35%] top-6 h-1 w-1 rounded-full bg-champagne animate-twinkle" style={{ animationDelay: '1.5s', boxShadow: '0 0 5px rgba(232, 201, 138, 0.6)' }} />
          <div className="absolute left-[65%] top-8 h-1.5 w-1.5 rounded-full bg-soft-peach animate-twinkle" style={{ animationDelay: '2s', boxShadow: '0 0 6px rgba(243, 182, 162, 0.6)' }} />

          {/* Constellation connecting line */}
          <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
            <motion.path
              d="M 20% 8 L 50% 0 L 80% 6 M 50% 0 L 35% 10 M 50% 0 L 65% 12"
              stroke="rgba(232, 201, 138, 0.35)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            />
          </svg>
        </div>

        {/* Cream card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative rounded-3xl border border-dusty-purple/10 bg-cream p-8 shadow-2xl shadow-dusty-purple/10 sm:p-12 md:p-14"
        >
          {/* Small crescent moon above card */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-cream via-champagne/40 to-champagne/20 animate-moon-breathe" style={{ boxShadow: '0 0 20px rgba(232, 201, 138, 0.4)' }}>
              <div className="absolute top-0 right-0 h-8 w-8 rounded-full bg-cream" style={{ transform: 'translate(3px, -3px)' }} />
            </div>
          </div>

          {/* Decorative corner sparkles */}
          <div className="absolute -top-3 -left-3 h-5 w-5">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-champagne">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
          <div className="absolute -bottom-3 -right-3 h-5 w-5">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-soft-peach">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-center font-serif text-2xl text-deep-plum sm:text-3xl">
            One More Thing <span className="text-champagne">✦</span>
          </h2>

          {/* Message */}
          <div className="mt-6 space-y-4 text-center text-sm leading-relaxed text-muted-purple sm:text-base">
            <p>
              And if you ever need anything — help with something, someone to talk to, or just a hand with something — you can always reach out.
            </p>
            <p className="font-serif text-lg text-dusty-purple sm:text-xl">
              If I can help, I'll be there.
            </p>
          </div>

          {/* Optional contact button */}
          {CONTACT_LINK && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <motion.a
                href={CONTACT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full border border-dusty-purple/25 bg-lavender/50 px-7 py-3 font-medium text-dusty-purple shadow-md shadow-dusty-purple/10 transition-all hover:bg-lavender hover:shadow-lg hover:shadow-dusty-purple/20"
              >
                <span>Just Reach Out</span>
                <span className="text-champagne transition-transform group-hover:translate-x-1">✦</span>
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
