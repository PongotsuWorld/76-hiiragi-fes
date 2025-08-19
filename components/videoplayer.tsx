"use client";
import { useEffect, useRef } from "react";

type Props = {
  stream: MediaStream;
  muted?: boolean;
};

const VideoPlayer = ({ stream, muted = false }: Props) => {
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

export default VideoPlayer;
