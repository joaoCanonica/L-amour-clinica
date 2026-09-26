"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import type { MediaVideo } from "@/lib/media";

type VideoFeatureProps = {
  /** Um ou mais vídeos tocados em sequência (ex.: depoimento em duas partes). */
  sources: MediaVideo[];
  /** Descrição acessível do conteúdo do vídeo. */
  label: string;
  /** Texto do botão central. */
  cta?: string;
  /** Cor de fundo enquanto o vídeo carrega. */
  surface?: string;
  className?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Vídeo como peça central: em repouso toca sem som, em loop, só enquanto está
 * na tela (prévia viva). Um clique reinicia do começo com som e controles
 * discretos em texto — sem a barra padrão do navegador.
 */
export function VideoFeature({ sources, label, cta = "Assistir", surface = "bg-navy-800", className = "" }: VideoFeatureProps) {
  const frame = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<number[]>([]);
  const [ended, setEnded] = useState(false);
  const inView = useRef(false);

  const totalDuration = durations.length === sources.length ? durations.reduce((a, b) => a + b, 0) : NaN;

  // Durações de todas as partes (para o rótulo "com som · 1:35").
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      sources.map(
        (source) =>
          new Promise<number>((resolve) => {
            const probe = document.createElement("video");
            probe.preload = "metadata";
            probe.onloadedmetadata = () => resolve(probe.duration);
            probe.onerror = () => resolve(NaN);
            probe.src = source.src;
          }),
      ),
    ).then((d) => {
      if (!cancelled) setDurations(d);
    });
    return () => {
      cancelled = true;
    };
  }, [sources]);

  const safePlay = useCallback(() => {
    videoRef.current?.play().catch(() => setPlaying(false));
  }, []);

  // Prévia: toca/pausa conforme visibilidade.
  useEffect(() => {
    const el = frame.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!engaged && !prefersReducedMotion()) safePlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [engaged, safePlay]);

  function engage() {
    const video = videoRef.current;
    if (!video) return;
    setEngaged(true);
    setEnded(false);
    setMuted(false);
    video.muted = false;
    if (index !== 0) {
      setIndex(0);
    } else {
      video.currentTime = 0;
      safePlay();
    }
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) safePlay();
    else video.pause();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function handleEnded() {
    if (!engaged) return; // a prévia usa loop nativo
    if (index < sources.length - 1) {
      setIndex(index + 1);
    } else {
      setEnded(true);
      setPlaying(false);
    }
  }

  // Troca de parte: carrega e segue tocando.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !engaged) return;
    video.load();
    safePlay();
  }, [index, engaged, safePlay]);

  const src = `${sources[index].src}#t=0.1`;

  return (
    <div
      ref={frame}
      className={`group/video relative overflow-hidden ${surface} ${className}`}
      style={{ aspectRatio: `${sources[0].width} / ${sources[0].height}` }}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted={muted}
        loop={!engaged}
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
        }}
      />

      {/* Véu inferior: garante leitura dos controles sobre qualquer quadro */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/70 to-transparent"
      />

      {!engaged || ended ? (
        <button
          type="button"
          onClick={engage}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-linho"
          aria-label={`${ended ? "Assistir novamente" : cta}: ${label}`}
        >
          <span className="relative flex size-24 items-center justify-center rounded-full border border-linho/60 backdrop-blur-[2px] transition-[transform,background-color] duration-700 ease-expo group-hover/video:scale-105 group-hover/video:bg-linho/10 sm:size-28">
            <svg aria-hidden viewBox="0 0 12 14" className="ml-1 h-4 w-auto fill-current">
              <path d="M0 0v14l12-7z" />
            </svg>
          </span>
          <span className="type-label">{ended ? "Assistir novamente" : cta}</span>
          {Number.isFinite(totalDuration) ? (
            <span className="type-label -mt-3 text-linho/70">com som · {formatTime(totalDuration)}</span>
          ) : null}
        </button>
      ) : null}

      {engaged && !ended ? (
        <div className={`absolute inset-x-0 bottom-0 p-5 text-linho sm:p-6`}>
          <div className="mb-4 flex gap-1.5" aria-hidden>
            {sources.map((s, i) => (
              <span key={s.src} className="h-px flex-1 overflow-hidden bg-linho/30">
                <span
                  className="block h-full origin-left bg-linho"
                  style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }}
                />
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between type-label">
            <button type="button" onClick={togglePlay} className="py-2">
              {playing ? "Pausar" : "Continuar"}
            </button>
            {sources.length > 1 ? (
              <span aria-live="polite" className="text-linho/70">
                Parte {index + 1} de {sources.length}
              </span>
            ) : null}
            <button type="button" onClick={toggleMute} className="py-2" aria-pressed={!muted}>
              {muted ? "Ativar som" : "Sem som"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
