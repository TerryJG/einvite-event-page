import { Slider } from '@/components/ui/slider';
import { PlayButton } from './PlayButton';
import { RepeatButton } from './RepeatButton';
import { SpotifyButton } from './SpotifyButton';

type PlayerControlsProps = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isRepeat: boolean;
  onTogglePlay: () => void;
  onSeek: (value: number[]) => void;
  onToggleRepeat: () => void;
  formatTime: (time: number) => string;
  spotifyLink: string;
};

export function PlayerControls({ isPlaying, currentTime, duration, isRepeat, onTogglePlay, onSeek, onToggleRepeat, formatTime, spotifyLink }: PlayerControlsProps) {
  return (
    <div className="mb-1 flex items-center space-x-1 sm:space-x-2">
      {/* Play Button */}
      <PlayButton isPlaying={isPlaying} onTogglePlay={onTogglePlay} />

      {/* Repeat Button */}
      <RepeatButton isRepeat={isRepeat} onToggleRepeat={onToggleRepeat} />

      {/* Spotify Button */}
      <SpotifyButton link={spotifyLink} />

      {/* Progress Bar */}
      <div className="min-w-0 flex-1">
        <Slider
          value={[currentTime]}
          onValueChange={onSeek}
          max={duration || 100}
          step={0.1}
          className="cursor-pointer **:data-[slot=slider-range]:bg-violet-500 **:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-thumb]:border-violet-500 **:data-[slot=slider-thumb]:bg-violet-500 **:data-[slot=slider-thumb]:hover:ring-violet-500/50 **:data-[slot=slider-track]:bg-slate-300/50"
        />
      </div>

      {/* Time Display */}
      <div className="flex min-w-0 justify-center text-xs text-slate-400">
        <span className="truncate">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
