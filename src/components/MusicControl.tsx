import { useEffect, useRef, useState } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const audio = new Audio('/music/birthday.mp3');
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      // Audio file may not exist yet — silently ignore
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      {/* Expandable controls */}
      <div
        className={`flex items-center gap-2 overflow-hidden rounded-full border border-dusty-purple/15 bg-cream/80 backdrop-blur-md shadow-lg shadow-dusty-purple/10 transition-all duration-300 ${
          showControls ? 'px-3 py-2' : 'p-2'
        }`}
        style={{ width: showControls ? 'auto' : 'auto' }}
      >
        <button
          onClick={togglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-dusty-purple/10 text-dusty-purple transition-colors hover:bg-dusty-purple/20"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Animated equalizer */}
        {isPlaying && (
          <div className="flex h-5 items-end gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-dusty-purple"
                style={{
                  animation: `equalizer ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {showControls && (
          <>
            <div className="mx-1 h-5 w-px bg-dusty-purple/20" />
            <button
              onClick={toggleMute}
              className="flex h-6 w-6 items-center justify-center text-muted-purple transition-colors hover:text-dusty-purple"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setMuted(false);
              }}
              className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-dusty-purple/20 accent-dusty-purple"
              aria-label="Volume"
            />
          </>
        )}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-dusty-purple/15 bg-cream/80 text-dusty-purple backdrop-blur-md shadow-lg shadow-dusty-purple/10 transition-transform hover:scale-105"
        aria-label="Music controls"
      >
        <Music size={16} />
      </button>
    </div>
  );
}
