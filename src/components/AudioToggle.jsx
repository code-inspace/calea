import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/sound.wav");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.volume = 0;
        }
      }, 50);
      setIsPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        // Fade in
        const fadeIn = setInterval(() => {
          if (audio.volume < 0.3) {
            audio.volume = Math.min(0.3, audio.volume + 0.03);
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
        setIsPlaying(true);
      }).catch(e => console.error("Audio play failed:", e));
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-4 bg-paradou-green/10 backdrop-blur-md rounded-full text-paradou-green border border-paradou-green/20 hover:bg-paradou-green hover:text-white transition-all duration-300"
      aria-label="Toggle Audio"
    >
      {isPlaying ? <Volume2 size={20} strokeWidth={1.5} /> : <VolumeX size={20} strokeWidth={1.5} />}
    </button>
  );
}

