import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  show: boolean;
}

export default function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-lavender"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Animated moon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cream via-champagne/40 to-champagne/20 animate-moon-breathe" />
            </motion.div>

            {/* Stars around loading */}
            <div className="absolute -top-4 left-0 h-1.5 w-1.5 rounded-full bg-champagne animate-twinkle" />
            <div className="absolute top-8 -right-8 h-1 w-1 rounded-full bg-soft-peach animate-twinkle" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-0 -left-12 h-1.5 w-1.5 rounded-full bg-champagne animate-twinkle" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-4 -right-4 h-1 w-1 rounded-full bg-soft-peach animate-twinkle" style={{ animationDelay: '1.5s' }} />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif text-xl text-dusty-purple tracking-wide"
            >
              Preparing something special...
            </motion.p>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-dusty-purple/60"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm text-muted-purple"
            >
              ✦
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
