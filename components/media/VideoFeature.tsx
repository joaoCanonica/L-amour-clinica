"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import type { MediaVideo } from "@/lib/media";

type VideoFeatureProps = {
  /** Um ou mais vídeos tocados em sequência (ex.: depoimento em duas partes). */
  sources: MediaVideo[];
  /** Descrição acessível do conteúdo do vídeo. */
  label: string;
  /** Texto do controle de reprodução. */
  cta?: string;
  /** Rótulos das partes, exibidos como capítulos quando há mais de um vídeo. */
  chapters?: string[];
  /** Cor de fundo enquanto o poster carrega. */
  surface?: string;
  /** `sizes` do poster (next/image). */
  sizes?: string;
  className?: string;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Vídeo como peça central.
 * - Nada é baixado até o player se aproximar da viewport; até lá, só o poster
 *   (next/image).
 * - Em repouso, toca sem som e em loop enquanto está na tela (prévia viva),
 *   sempre antes do card final com o logo — o loop nunca pisca branco.
 * - Um clique reinicia do começo, com som e controles em texto.
 */
export function VideoFeature({
  sources,
  label,
  cta = "Assistir",
  chapters,
  surface = "bg-navy-800",
  sizes = "(min-width: 1024px) 30vw, 80vw",
  className = "",
}: VideoFeatureProps) {
  const frame = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);

  const current = sources[index];
  const total = sources.reduce((sum, s) => sum + s.contentEnd, 0);

  const safePlay = useCallback(() => {
    videoRef.current?.play().catch(() => setPlaying(false));
  }, []);

  // Carregamento preguiçoso: o src só entra quando o player está perto.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Prévia: toca/pausa conforme visibilidade.
  useEffect(() => {
    const el = frame.current;
    const video = videoRef.current;
    if (!el || !video || !near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
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
  }, [near, engaged, safePlay]);

  // Troca de parte durante a reprodução com som.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !engaged) return;
    video.muted = false;
    video.load();
    safePlay();
  }, [index, engaged, safePlay]);

  function start(part = 0) {
    const video = videoRef.current;
    setNear(true);
    setEngaged(true);
    setEnded(false);
    setMuted(false);
    if (video && part === index) {
      video.muted = false;
      video.currentTime = 0;
      safePlay();
    } else {
      setIndex(part);
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

  function handleTime(video: HTMLVideoElement) {
    const end = current.contentEnd;
    if (video.currentTime >= end) {
      if (!engaged) {
        video.currentTime = 0;
        return;
      }
      if (index < sources.length - 1) {
        setIndex(index + 1);
      } else {
        video.pause();
        setEnded(true);
      }
      return;
    }
    setProgress(video.currentTime / end);
  }

  const showIdle = !engaged || ended;

  return (
    <div className={className}>
      <div
        ref={frame}
        className={`group/video relative overflow-hidden ${surface}`}
        style={{ aspectRatio: `${sources[0].width} / ${sources[0].height}` }}
      >
        <video
          ref={videoRef}
          src={near ? current.src : undefined}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          muted={muted}
          preload="none"
          aria-label={label}
          onPlaying={() => {
            setPlaying(true);
            setHasFrame(true);
          }}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => handleTime(e.currentTarget)}
        />

        {/* Poster otimizado: some quando o vídeo tem o primeiro quadro. */}
        <Image
          src={current.poster}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-700 ${hasFrame ? "opacity-0" : "opacity-100"}`}
        />

        {/* Véu inferior: legibilidade dos controles sobre qualquer quadro */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/75 to-transparent"
        />

        {showIdle ? (
          <button
            type="button"
            onClick={() => start(0)}
            className="absolute inset-0 flex flex-wrap content-end items-end justify-between gap-x-4 gap-y-2 p-5 text-left text-linho sm:p-6"
            aria-label={`${ended ? "Assistir novamente" : cta}: ${label}`}
          >
            <span className="flex items-center gap-3 whitespace-nowrap type-label">
              <svg aria-hidden viewBox="0 0 8 10" className="h-2.5 w-2 shrink-0 fill-current">
                <path d="M0 0v10l8-5z" />
              </svg>
              <span className="relative pb-1">
                {ended ? "Assistir novamente" : cta}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-700 ease-expo group-hover/video:scale-x-100" />
              </span>
            </span>
            <span className="type-label shrink-0 text-linho/75">com som · {formatTime(total)}</span>
          </button>
        ) : (
          <div className="absolute inset-x-0 bottom-0 p-5 text-linho sm:p-6">
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
                <span aria-live="polite" className="text-linho/75">
                  {chapters?.[index] ?? `Parte ${index + 1}`}
                </span>
              ) : null}
              <button type="button" onClick={toggleMute} className="py-2" aria-pressed={!muted}>
                {muted ? "Ativar som" : "Sem som"}
              </button>
            </div>
          </div>
        )}
      </div>

      {sources.length > 1 ? (
        <ol className="mt-4 grid border-t hairline" style={{ gridTemplateColumns: `repeat(${sources.length}, 1fr)` }}>
          {sources.map((s, i) => {
            const active = engaged && !ended && i === index;
            return (
              <li key={s.src}>
                <button
                  type="button"
                  onClick={() => start(i)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-baseline justify-between gap-3 py-3 pr-4 text-left type-label transition-opacity ${
                    active ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <span>{chapters?.[i] ?? `Parte ${i + 1}`}</span>
                  <span>{formatTime(s.contentEnd)}</span>
                </button>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
