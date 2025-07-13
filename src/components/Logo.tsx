import logo from '../assets/logo.png';

export function Logo({ className, logoClassName, textClassName, showText = true }: { className?: string; logoClassName?: string; textClassName?: string; showText?: boolean }) {
  return (
    <section id="logo-container" className={`${className}`}>
      <img id="logo-img" src={logo} alt="logo" draggable={false} className={`${logoClassName} mx-auto w-36`} />

      {showText && (
        <p id="logo-text" className={`${textClassName} select-none font-hypatia font-sem -mt-2 text-center tracking-widest uppercase`}>
          Daniel Bostwick Music Presents
        </p>
      )}
    </section>
  );
}
