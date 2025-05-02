import { useRef, useState } from "react";
import IconExpand from "@/shared/icons/expand";
import IconSpeaker from "@/shared/icons/speaker";
import IconPlay from "@/shared/icons/play";

interface VideoPlayerProps {
  videoSrc: string;
  width?: number;
  height?: number;
  className?: string;
}

const VideoPlayer = ({ videoSrc, width = 1016, height = 574, className = "" }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const enterFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative">
      <video
        width={width || 900}
        height={height || 600}
        className={`w-full aspect-[770/440] object-cover rounded-xl xl:rounded-3xl ${className}`}
        ref={videoRef}
        controls
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute bottom-4 lg:bottom-6 end-4 lg:end-6 flex flex-col gap-1.5">
        <button
          onClick={togglePlay}
          className="size-6 md:size-10 lg:size-12 p-1.5 md:p-2 lg:p-3 text-accent-white bg-accent-white/50 backdrop-blur-sm rounded-full"
        >
          {isPlaying ? <IconPlay /> : <IconPlay />}
        </button>

        <button
          onClick={toggleMute}
          className="size-6 md:size-10 lg:size-12 p-1.5 md:p-2 lg:p-3 text-accent-white bg-accent-white/50 backdrop-blur-sm rounded-full"
        >
          {isMuted ? <IconSpeaker /> : <IconSpeaker />}
        </button>

        <button
          onClick={enterFullScreen}
          className="size-6 md:size-10 lg:size-12 p-1.5 md:p-2 lg:p-3 text-accent-white bg-accent-white/50 backdrop-blur-sm rounded-full"
        >
          <IconExpand />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
