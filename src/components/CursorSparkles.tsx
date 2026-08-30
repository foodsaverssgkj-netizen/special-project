import { useEffect, useState } from 'react';

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
}

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState<CursorSparkle[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop (non-touch)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let id = 0;
    let lastTime = 0;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 80) return;
      lastTime = now;

      const sparkle = { id: id++, x: e.clientX, y: e.clientY };
      setSparkles((prev) => [...prev.slice(-15), sparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            transform: 'translate(-50%, -50%)',
            animation: 'sparkle-pop 0.8s ease-out forwards',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0L11.5 8.5L20 10L11.5 11.5L10 20L8.5 11.5L0 10L8.5 8.5L10 0Z"
              fill="#E8C98A"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
