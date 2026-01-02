type TrackInfoProps = {
  title: string;
  artist: string;
};

export function TrackInfo({ title, artist }: TrackInfoProps) {
  return (
    <div className="mb-2">
      <h3 className="truncate text-sm font-medium text-slate-100">{title}</h3>
      <p className="truncate text-xs text-slate-400">{artist}</p>
    </div>
  );
}
