import { motion } from 'framer-motion';
import StarField from '@/components/StarField';

interface CardItem {
  title: string;
  description: string;
  icon: string;
}

const CARDS: CardItem[] = [
  { title: 'More laughter', description: 'The kind that makes your cheeks hurt.', icon: '😊' },
  { title: 'More late-night conversations', description: 'The ones you don\'t want to end.', icon: '🌙' },
  { title: 'More spontaneous plans', description: 'Because the unplanned days sometimes become the best ones.', icon: '✦' },
  { title: 'More tiny victories', description: 'Even the ones nobody else notices.', icon: '⭐' },
  { title: 'More peaceful mornings', description: 'Slow starts, good thoughts and nowhere to rush.', icon: '☀' },
  { title: 'More reasons to celebrate', description: 'Big reasons, small reasons — all of them count.', icon: '✨' },
];

export default function LittleThingsSection() {
  return (
    <section
      id="little-things"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #F0EAF8 0%, #F4F0FA 50%, #F4F0FA 100%)',
      }}
    >
      <StarField count={25} seed={44} />

      <div className="relative z-10 w-full max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-3xl text-deep-plum sm:text-4xl md:text-5xl"
        >
          A Few Things I Hope You Get More Of
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-dusty-purple/10 bg-cream p-6 shadow-lg shadow-dusty-purple/5 transition-shadow hover:shadow-xl hover:shadow-soft-peach/15"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-soft-peach/5 via-transparent to-champagne/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-soft-peach/20 to-champagne/20 text-2xl">
                  {card.icon}
                </div>
                <h3 className="font-serif text-xl text-deep-plum">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-purple">
                  {card.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-soft-peach to-champagne transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
