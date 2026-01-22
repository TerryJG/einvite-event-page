type AlbumCoverProps = {
  albumCover: string | undefined;
};

export function AlbumCover({ albumCover }: AlbumCoverProps) {
  return (
    <div className="relative shrink-0">
      <img src={albumCover} alt="Album Cover" draggable={false} className="h-18 w-18 rounded-md object-cover" />
      <div className="absolute inset-0 rounded-md bg-black/20" />
    </div>
  );
}
