"use client";
import { useEffect, useRef } from "react";

type Props = {
  stream: MediaStream;
  muted?: boolean;
};

export default function VideoPlayer({ stream, muted = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
      className="ObserverVideo"
    />
  );
}
