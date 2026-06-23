'use client';

'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoPlay = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Autoplay may be blocked by browser policy without user interaction.
      }
    };

    tryAutoPlay();
  }, []);

  return (
    <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
  );
}
