"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface AudioState {
  trackId: string | null;
  title: string;
  composer: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

interface AudioContextValue {
  state: AudioState;
  play: (track: { id: string; title: string; composer: string; previewUrl: string }) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    trackId: null,
    title: "",
    composer: "",
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  const play = useCallback(
    (track: { id: string; title: string; composer: string; previewUrl: string }) => {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.addEventListener("timeupdate", () => {
          setState((s) => ({
            ...s,
            currentTime: audioRef.current?.currentTime ?? 0,
          }));
        });
        audioRef.current.addEventListener("loadedmetadata", () => {
          setState((s) => ({
            ...s,
            duration: audioRef.current?.duration ?? 0,
          }));
        });
        audioRef.current.addEventListener("ended", () => {
          setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
        });
        audioRef.current.addEventListener("error", () => {
          setState((s) => ({ ...s, isPlaying: false }));
        });
      }

      if (state.trackId !== track.id) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.load();
      }

      audioRef.current.play();
      setState({
        trackId: track.id,
        title: track.title,
        composer: track.composer,
        isPlaying: true,
        currentTime: state.trackId === track.id ? state.currentTime : 0,
        duration: state.trackId === track.id ? state.duration : 0,
      });
    },
    [state.trackId, state.currentTime, state.duration]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else if (state.trackId && audioRef.current) {
      audioRef.current.play();
      setState((s) => ({ ...s, isPlaying: true }));
    }
  }, [state.isPlaying, state.trackId, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  return (
    <AudioContext.Provider value={{ state, play, pause, toggle, seek }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
}
