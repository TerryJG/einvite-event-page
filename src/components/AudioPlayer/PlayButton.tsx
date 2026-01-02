type PlayButtonProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
};

export function PlayButton({ isPlaying, onTogglePlay }: PlayButtonProps) {
  return (
    <button onClick={onTogglePlay} className="shrink-0 rounded-full bg-violet-500 p-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-violet-600">
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
