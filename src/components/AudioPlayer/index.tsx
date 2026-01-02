import { eventInfo } from '@/constants/eventInfo';
import { useState, useRef, useEffect } from 'react';
import { AlbumCover } from './AlbumCover';
import { TrackInfo } from './TrackInfo';
import { PlayerControls } from './PlayerControls';

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

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
            isRepeat={isRepeat}
            onTogglePlay={togglePlay}
            onSeek={handleSeek}
            onToggleRepeat={toggleRepeat}
            formatTime={formatTime}
            spotifyLink={eventInfo.spotifyLink}
          />
        </div>
      </div>
    </div>
  );
}
