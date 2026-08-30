import { useState, useEffect, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import MusicControl from '@/components/MusicControl';
import CursorSparkles from '@/components/CursorSparkles';
import HeroSection from '@/sections/HeroSection';
import RevealSection from '@/sections/RevealSection';
import NoteSection from '@/sections/NoteSection';
import SkyYearSection from '@/sections/SkyYearSection';
import LittleThingsSection from '@/sections/LittleThingsSection';
import WishGeneratorSection from '@/sections/WishGeneratorSection';
import ReminderSection from '@/sections/ReminderSection';
import OneMoreThingSection from '@/sections/OneMoreThingSection';
import SkyWishesSection from '@/sections/SkyWishesSection';
import FinalSection from '@/sections/FinalSection';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = useCallback(() => {
    const el = document.getElementById('reveal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />

      <div className="grain-overlay" />

      <CursorSparkles />

      <Navigation />

      <main className="relative w-full">
        <HeroSection onEnter={handleEnter} />
        <RevealSection />
        <NoteSection />
        <SkyYearSection />
        <LittleThingsSection />
        <WishGeneratorSection />
        <ReminderSection />
        <OneMoreThingSection />
        <SkyWishesSection />
        <FinalSection />
      </main>

      <MusicControl />
    </>
  );
}

export default App;
