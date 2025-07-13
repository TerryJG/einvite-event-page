export function EventTitle({ className, titleClassName = 'text-5xl', subTitleClassName = 'text-xl' }: { className?: string; titleClassName?: string; subTitleClassName?: string }) {
  return (
    <section id="event-title-container" className={`${className} text-center select-none`}>
      <p className={`${titleClassName} font-bebas tracking-wider`}>God Our Only Hope</p>
      <p className={`${subTitleClassName} font-barlow -mt-2 tracking-wide`}>Live Debut Performance</p>
    </section>
  );
}
