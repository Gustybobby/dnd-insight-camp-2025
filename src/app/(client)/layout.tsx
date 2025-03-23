"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAudio } from "@/components/hooks/useAudio";

const BG_MUSIC_URL =
  "https://knesbjbvdhvateccugmo.supabase.co/storage/v1/object/public/audio/music.mp3";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function QueryClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [play] = useAudio(BG_MUSIC_URL);

  useEffect(() => {
    window.addEventListener("play music", play);
    return () => window.removeEventListener("play music", play);
  }, [play]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
