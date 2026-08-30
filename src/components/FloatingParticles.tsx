import { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  seed?: number;
}

interface ParticleData {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  color: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function FloatingParticles({
  count = 20,
  className = '',
  seed = 7,
}: FloatingParticlesProps) {
  const particles = useMemo<ParticleData[]>(() => {
    const rand = seededRandom(seed);
    const colors = ['rgba(232, 201, 138, 0.5)', 'rgba(243, 182, 162, 0.4)', 'rgba(139, 111, 174, 0.3)'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${rand() * 100}%`,
      size: 2 + rand() * 5,
      duration: `${15 + rand() * 20}s`,
      delay: `${rand() * 20}s`,
      color: colors[Math.floor(rand() * colors.length)],
    }));
  }, [count, seed]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `float-up ${p.duration} linear infinite`,
            animationDelay: p.delay,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
