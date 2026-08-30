import { useMemo } from 'react';

interface StarFieldProps {
  count?: number;
  className?: string;
  withShootingStars?: boolean;
  minSize?: number;
  maxSize?: number;
  seed?: number;
}

interface StarData {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function StarField({
  count = 60,
  className = '',
  withShootingStars = false,
  minSize = 1,
  maxSize = 3,
  seed = 42,
}: StarFieldProps) {
  const stars = useMemo<StarData[]>(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${rand() * 100}%`,
      left: `${rand() * 100}%`,
      size: minSize + rand() * (maxSize - minSize),
      delay: `${rand() * 5}s`,
      duration: `${2 + rand() * 4}s`,
      opacity: 0.4 + rand() * 0.6,
    }));
  }, [count, minSize, maxSize, seed]);

  const shootingStars = useMemo(() => {
    if (!withShootingStars) return [];
    const rand = seededRandom(seed + 100);
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${rand() * 40}%`,
      left: `${50 + rand() * 40}%`,
      delay: `${3 + i * 6 + rand() * 4}s`,
    }));
  }, [withShootingStars, seed]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.6})`,
          }}
        />
      ))}
      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute h-px w-20 bg-gradient-to-l from-transparent via-white to-transparent animate-shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
