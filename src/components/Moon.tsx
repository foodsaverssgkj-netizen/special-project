interface MoonProps {
  size?: number;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}

export default function Moon({
  size = 200,
  className = '',
  glow = true,
  style,
}: MoonProps) {
  return (
    <div
      className={`pointer-events-none ${glow ? 'animate-moon-breathe' : ''} ${className}`}
      style={style}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E8C98A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E8C98A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="moonBody" x1="30%" y1="20%" x2="70%" y2="80%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="60%" stopColor="#F5ECD8" />
            <stop offset="100%" stopColor="#E8C98A" />
          </linearGradient>
        </defs>
        {/* Outer glow */}
        <circle cx="100" cy="100" r="95" fill="url(#moonGlow)" />
        {/* Crescent moon — main circle minus offset circle */}
        <mask id="crescentMask">
          <rect width="200" height="200" fill="white" />
          <circle cx="135" cy="80" r="70" fill="black" />
        </mask>
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="url(#moonBody)"
          mask="url(#crescentMask)"
        />
        {/* Subtle craters on visible part */}
        <g mask="url(#crescentMask)" opacity="0.15">
          <circle cx="80" cy="120" r="6" fill="#8B6FAE" />
          <circle cx="65" cy="95" r="4" fill="#8B6FAE" />
          <circle cx="90" cy="140" r="3" fill="#8B6FAE" />
        </g>
      </svg>
    </div>
  );
}
