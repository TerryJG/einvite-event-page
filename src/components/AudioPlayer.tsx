import { eventInfo } from "@/constants/eventInfo";
import { useState, useRef, useEffect } from 'react';

type AudioPlayerProps = {
  audioSrc: string;
  albumCover: string;
  title: string;
  artist: string;
  defaultVolume?: number;
  repeatAudio?: boolean;
};

export function AudioPlayer({ audioSrc, albumCover, title, artist, defaultVolume = 0.5, repeatAudio = true }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [isRepeat, setIsRepeat] = useState(repeatAudio);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = defaultVolume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, defaultVolume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Components //
  function AlbumCover({ albumCover }: { albumCover: string }) {
    return (
      <div className="relative flex-shrink-0">
        <img src={albumCover} alt="Album Cover" draggable={false} className="h-18 w-18 rounded-md object-cover" />
        <div className="absolute inset-0 rounded-md bg-black/20" />
      </div>
    );
  }

  function TrackInfo({ title, artist }: { title: string; artist: string }) {
    return (
      <div className="mb-2">
        <h3 className="truncate text-sm font-medium text-slate-100">{title}</h3>
        <p className="truncate text-xs text-slate-400">{artist}</p>
      </div>
    );
  }

  function PlayButton({ isPlaying, onTogglePlay }: { isPlaying: boolean; onTogglePlay: () => void }) {
    return (
      <button onClick={onTogglePlay} className="flex-shrink-0 rounded-full bg-violet-500 p-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-violet-600">
        {isPlaying ? (
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    );
  }

  function VolumeButton({ volume, onVolumeChange }: { volume: number; onVolumeChange: (volume: number) => void }) {
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearHideTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearHideTimeout();
      timeoutRef.current = setTimeout(() => {
        setShowVolumeSlider(false);
      }, 300);
    };

    const handleMouseEnter = () => {
      clearHideTimeout();
      setShowVolumeSlider(true);
    };

    const handleMouseLeave = () => {
      if (!isDragging) {
        scheduleHide();
      }
    };

    const handleSliderMouseDown = () => {
      setIsDragging(true);
      clearHideTimeout();
    };

    const handleSliderMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => {
        if (!isDragging) {
          scheduleHide();
        }
      }, 100);
    };

    // Handle global mouse up to catch cases where mouse up happens outside slider
    useEffect(() => {
      const handleGlobalMouseUp = () => {
        if (isDragging) {
          setIsDragging(false);
          setTimeout(() => {
            if (!isDragging) {
              scheduleHide();
            }
          }, 100);
        }
      };

      if (isDragging) {
        document.addEventListener('mouseup', handleGlobalMouseUp);
      }

      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }, [isDragging]);

    useEffect(() => {
      return () => {
        clearHideTimeout();
      };
    }, []);

    return (
      <div className="relative hidden sm:block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="flex-shrink-0 rounded-full bg-slate-600 p-2 text-white transition-colors duration-200 hover:bg-slate-500"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
        </button>
        {showVolumeSlider && (
          <div
            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-md bg-slate-800 p-2 shadow-lg"
            onMouseEnter={clearHideTimeout}
            onMouseLeave={handleMouseLeave}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              onMouseDown={handleSliderMouseDown}
              onMouseUp={handleSliderMouseUp}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-slate-600 focus:outline-none"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume * 100}%, #475569 ${volume * 100}%, #475569 100%)`,
              }}
            />
          </div>
        )}
      </div>
    );
  }

  function RepeatButton({ isRepeat, onToggleRepeat }: { isRepeat: boolean; onToggleRepeat: () => void }) {
    return (
      <button
        onClick={onToggleRepeat}
        className={`hidden flex-shrink-0 rounded-full p-2 text-white transition-colors duration-200 hover:cursor-pointer sm:flex ${isRepeat ? 'bg-violet-500 hover:bg-violet-600' : 'bg-slate-600 hover:bg-slate-500'}`}
      >
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
        </svg>
      </button>
    );
  }

  function SpotifyButton({ link }: { link: string }) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="flex-shrink-0 rounded-full bg-green-500 px-2 py-1 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-green-600">
          <i className="fa-brands fa-spotify text-md"></i>
        </button>
      </a>
    );
  }

  function PlayerControls({
    isPlaying,
    currentTime,
    duration,
    volume,
    isRepeat,
    onTogglePlay,
    onSeek,
    onVolumeChange,
    onToggleRepeat,
    formatTime,
  }: {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isRepeat: boolean;
    onTogglePlay: () => void;
    onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onVolumeChange: (volume: number) => void;
    onToggleRepeat: () => void;
    formatTime: (time: number) => string;
  }) {
    return (
      <div className="mb-1 flex items-center space-x-1 sm:space-x-2">
        {/* Play Button */}
        <PlayButton isPlaying={isPlaying} onTogglePlay={onTogglePlay} />

        {/* Volume Button */}
        <div className="hidden">
          <VolumeButton volume={volume} onVolumeChange={onVolumeChange} />
        </div>
        {/* Repeat Button */}
        <RepeatButton isRepeat={isRepeat} onToggleRepeat={onToggleRepeat} />

        {/* Spotify Button */}
        <SpotifyButton link={eventInfo.spotifyLink} />
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={onSeek}
          className="focus:ring-opacity-50 h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-slate-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          style={{
            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, #475569 ${(currentTime / duration) * 100}%, #475569 100%)`,
          }}
        />

        {/* Time Display */}
        <div className="flex min-w-0 justify-center text-xs text-slate-400">
          <span className="truncate">
            {formatTime(currentTime)}/{formatTime(duration)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full rounded-md bg-purple-900/30 p-2 backdrop-blur-sm">
      <audio ref={audioRef} src={audioSrc} />
      {/* Mini Player Layout */}
      <div className="flex items-center space-x-3">
        <AlbumCover albumCover={albumCover} />
        <div className="min-w-0 flex-1">
          <TrackInfo title={title} artist={artist} />
          <PlayerControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isRepeat={isRepeat}
            onTogglePlay={togglePlay}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleRepeat={toggleRepeat}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}
