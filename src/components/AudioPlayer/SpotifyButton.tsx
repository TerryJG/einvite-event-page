type SpotifyButtonProps = {
  link: string;
};

export function SpotifyButton({ link }: SpotifyButtonProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="shrink-0 rounded-full bg-green-500 px-2 py-1 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-green-600">
        <i className="fa-brands fa-spotify text-md"></i>
      </button>
    </a>
  );
}
