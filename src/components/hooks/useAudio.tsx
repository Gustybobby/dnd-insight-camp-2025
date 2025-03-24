"use client";

import { useCallback, useEffect, useState } from "react";

export function useAudio(url: string) {
  const [audio] = useState(typeof Audio != "undefined" ? new Audio(url) : null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => setPlaying(true), []);

  useEffect(() => {
    if (playing) {
      void audio?.play();
    } else {
      audio?.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    if (audio) {
      audio.volume = 0.2;
    }
    audio?.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio?.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [play] as const;
}
