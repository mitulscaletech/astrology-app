import { useCallback, useRef, useState } from "react";
import IconExpand from "@/shared/icons/expand";
import IconSpeaker from "@/shared/icons/speaker";
import IconPlay from "@/shared/icons/play";
import { IconSpeakerMuted, IconPause } from "@/shared/icons/booking";

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
  const [isHovering, setIsHovering] = useState(false);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const enterFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video
        width={width || 900}
        height={height || 600}
        className={`w-full aspect-[770/440] object-cover rounded-xl xl:rounded-3xl ${className}`}
        ref={videoRef}
        controls={false}
        onClick={togglePlay}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {(!isPlaying || (isPlaying && isHovering)) && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-6 md:size-10 lg:size-12 p-1.5 md:p-2 lg:p-3 text-accent-white bg-accent-white/50 backdrop-blur-sm rounded-full transition-all"
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
      )}
      <div className="absolute bottom-4 lg:bottom-6 end-4 lg:end-6 flex flex-col gap-1.5">
        <button
          onClick={toggleMute}
          className="size-6 md:size-10 lg:size-12 p-1.5 md:p-2 lg:p-3 text-accent-white bg-accent-white/50 backdrop-blur-sm rounded-full"
        >
          {isMuted ? <IconSpeakerMuted /> : <IconSpeaker />}
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
