import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  bg?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  bg = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${bg} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
