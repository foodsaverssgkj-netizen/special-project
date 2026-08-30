import { useMemo } from 'react';

interface CloudsProps {
  className?: string;
  count?: number;
  seed?: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function Clouds({ className = '', count = 3, seed = 15 }: CloudsProps) {
  const clouds = useMemo(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${10 + rand() * 60}%`,
      scale: 0.6 + rand() * 0.8,
      duration: `${40 + rand() * 40}s`,
      delay: `${rand() * 20}s`,
      opacity: 0.15 + rand() * 0.15,
    }));
  }, [count, seed]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-cloud-drift"
          style={{
            top: cloud.top,
            transform: `scale(${cloud.scale})`,
            opacity: cloud.opacity,
            animationDuration: cloud.duration,
            animationDelay: cloud.delay,
          }}
        >
          <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
            <ellipse cx="60" cy="50" rx="50" ry="25" fill="#FFFDF8" />
            <ellipse cx="100" cy="40" rx="45" ry="30" fill="#FFFDF8" />
            <ellipse cx="140" cy="50" rx="40" ry="22" fill="#FFFDF8" />
            <ellipse cx="170" cy="55" rx="30" ry="18" fill="#FFFDF8" />
          </svg>
        </div>
      ))}
    </div>
  );
}
