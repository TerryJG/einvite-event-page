type SpotifyButtonProps = {
  link: string;
};

export function SpotifyButton({ link }: SpotifyButtonProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="flex shrink-0 items-center justify-center rounded-full bg-green-500 p-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-green-600">
        <i className="fa-brands fa-spotify text-base"></i>
      </button>
    </a>
  );
}
