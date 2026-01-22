type RepeatButtonProps = {
  isRepeat: boolean;
  onToggleRepeat: () => void;
};

export function RepeatButton({ isRepeat, onToggleRepeat }: RepeatButtonProps) {
  return (
    <button
      onClick={onToggleRepeat}
      className={`hidden shrink-0 items-center justify-center rounded-full p-2 text-white transition-colors duration-200 hover:cursor-pointer sm:flex ${isRepeat ? 'bg-violet-500 hover:bg-violet-600' : 'bg-slate-600 hover:bg-slate-500'}`}
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
      </svg>
    </button>
  );
}
