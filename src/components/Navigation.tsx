import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  target: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', target: 'hero' },
  { label: 'Birthday', target: 'reveal' },
  { label: 'Wishes', target: 'wishes' },
  { label: 'Note', target: 'note' },
  { label: 'Final', target: 'final' },
];

const SECTION_IDS = ['hero', 'reveal', 'note', 'sky-year', 'little-things', 'wish-generator', 'reminder', 'one-more-thing', 'sky-wishes', 'final'];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(scrollY / maxScroll, 1));

      // Find active section
      const midScreen = scrollY + window.innerHeight / 2;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= midScreen) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-dusty-purple via-champagne to-soft-peach transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Desktop navigation */}
      <nav className="fixed top-4 right-4 z-50 hidden md:block">
        <div className="flex items-center gap-1 rounded-full border border-dusty-purple/15 bg-cream/70 px-2 py-1.5 backdrop-blur-md shadow-lg shadow-dusty-purple/10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium text-muted-purple transition-colors hover:text-dusty-purple"
            >
              {activeSection === NAV_ITEMS.indexOf(item) ||
              (item.target === 'wishes' && activeSection >= 3 && activeSection <= 8) ||
              (item.target === 'note' && activeSection === 2) ||
              (item.target === 'birthday' && activeSection === 1) ||
              (item.target === 'home' && activeSection === 0) ||
              (item.target === 'final' && activeSection === 9) ? (
                <span className="text-dusty-purple">{item.label}</span>
              ) : (
                item.label
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile navigation */}
      <nav className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-dusty-purple/15 bg-cream/80 backdrop-blur-md shadow-lg shadow-dusty-purple/10 text-dusty-purple"
          aria-label="Menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 right-0 flex flex-col gap-1 rounded-2xl border border-dusty-purple/15 bg-cream/90 p-2 backdrop-blur-md shadow-xl shadow-dusty-purple/15"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className="rounded-xl px-5 py-2.5 text-left text-sm font-medium text-muted-purple transition-colors hover:bg-lavender hover:text-dusty-purple"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Section indicator dots (left side) */}
      <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group relative flex items-center"
            aria-label={`Go to section ${i + 1}`}
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'w-6 bg-dusty-purple'
                  : 'w-2 bg-dusty-purple/30 hover:bg-dusty-purple/50'
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
