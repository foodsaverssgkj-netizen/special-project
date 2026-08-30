import { useMemo } from 'react';

interface SparkleBurstProps {
  count?: number;
  x?: number;
  y?: number;
  trigger?: number;
}

interface SparkleData {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
}

export default function SparkleBurst({
  count = 12,
  x = 0,
  y = 0,
  trigger = 0,
}: SparkleBurstProps) {
  const sparkles = useMemo<SparkleData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2 + Math.random() * 0.5,
      distance: 30 + Math.random() * 60,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 0.2,
      duration: 0.6 + Math.random() * 0.4,
    }));
  }, [count, trigger]);

  if (trigger === 0) return null;

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{ left: x, top: y }}
    >
      {sparkles.map((s) => (
        <div
          key={`${s.id}-${trigger}`}
          className="absolute"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${Math.cos(s.angle) * s.distance}px, ${Math.sin(s.angle) * s.distance}px)`,
            animation: `sparkle-pop ${s.duration}s ease-out ${s.delay}s forwards`,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0L11.5 8.5L20 10L11.5 11.5L10 20L8.5 11.5L0 10L8.5 8.5L10 0Z"
              fill="#E8C98A"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
