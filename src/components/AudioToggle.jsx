import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // We use an Audio object to handle the ambient sound
    const audio = new Audio("https://cdn.freesound.org/previews/611/611369_2282212-lq.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // This MUST be triggered by user interaction
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-4 bg-paradou-green/10 backdrop-blur-md rounded-full text-paradou-green border border-paradou-green/20 hover:bg-paradou-green hover:text-white transition-all duration-300"
      aria-label="Toggle Audio"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
