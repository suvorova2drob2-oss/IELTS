import { useEffect, useRef, useState } from "react";

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  src,
  label,
}: {
  src: string;
  label?: string;
}) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
    setCurrent(0);
  }, [src]);

  return (
    <div className="pl-audio">
      {label && <span className="pl-audio__label">{label}</span>}
      <audio
        ref={ref}
        src={src}
        preload="metadata"
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onTimeUpdate={() => setCurrent(ref.current?.currentTime ?? 0)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        className="pl-audio__play"
        onClick={() => {
          const el = ref.current;
          if (!el) return;
          if (el.paused) {
            void el.play();
            setPlaying(true);
          } else {
            el.pause();
            setPlaying(false);
          }
        }}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <input
        className="pl-audio__seek"
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={current}
        onChange={(e) => {
          const t = Number(e.target.value);
          if (ref.current) ref.current.currentTime = t;
          setCurrent(t);
        }}
      />
      <span className="pl-audio__time">
        {formatTime(current)} / {formatTime(duration)}
      </span>
    </div>
  );
}
