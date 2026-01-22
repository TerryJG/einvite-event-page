import { Logo } from '@/components/Logo';
import { EventTitle } from '@/components/EventTitle';
import { eventInfo } from '@/constants/eventInfo';
import { Space } from '@/components/Space';
import { AudioPlayer, playerVisibleAtom, isPlayingAtom } from '@/components/AudioPlayer';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'motion/react';
import { useAtom, useAtomValue } from 'jotai';

export default function App() {
  const [playerVisible, setPlayerVisible] = useAtom(playerVisibleAtom);
  const isPlaying = useAtomValue(isPlayingAtom);

  const handleTap = () => {
    setPlayerVisible(!playerVisible);
  };

  const handleHoverStart = () => {
    setPlayerVisible(true);
  };

  const handleHoverEnd = () => {
    if (isPlaying) {
      setPlayerVisible(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-violet-900/60 to-purple-900/40 text-slate-50">
      <AuroraBackground>
        <div className="flex min-h-screen flex-col">
          <div className="px-6">
            <Logo className="pt-4" />
          </div>

          <div className="flex flex-1 items-center px-6 py-4">
            <div className="w-full">
              <Space paddingX={4} />

              {/* EventTitle on small screens */}
              <div className="lg:hidden">
                <EventTitle />
                <Space paddingX={4} />
              </div>

              {/* Grid layout for larger screens */}
              <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                <div className="flex justify-center lg:justify-end">
                  <motion.div className="relative" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} onTap={handleTap}>
                    <img src={eventInfo.albumCover} alt="album-cover" className="w-104 rounded-sm opacity-90 drop-shadow-lg lg:w-lg" />
                    <div className="absolute right-4 bottom-4 left-4">
                      <AudioPlayer audioSrc="god-our-only-hope.mp3" repeatAudio={true} />
                    </div>
                  </motion.div>
                </div>

                <div className="lg:max-w-none">
                  {/* EventTitle on large screens */}
                  <div className="hidden lg:block">
                    <EventTitle />
                  </div>

                  <Space paddingX={4} />
                  <p className="font-roboto mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none">
                    You are cordially invited to the live debut performance of <span className="text-violet-400">God Our Only Hope</span>, written and composed by new Bahamian
                    gospel music artist, <span className="text-violet-400">Daniel Bostwick</span>.
                  </p>
                  <Space paddingX={4} />

                  <section id="event-info-container" className="mx-auto max-w-2xl space-y-3 py-3 lg:mx-0 lg:max-w-none">
                    <div
                      id="event-info--date-time-container"
                      className="group relative overflow-hidden rounded-2xl border-t border-b border-violet-500/20 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/20"
                    >
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6">
                        <div className="flex justify-center">
                          <div className="flex h-20 w-20 items-center justify-center rounded-xl">
                            <i className="fa-solid fa-calendar text-7xl text-white"></i>
                          </div>
                        </div>
                        <div className="flex flex-col text-center md:text-left">
                          <p className="mb-2 text-sm font-semibold tracking-wider text-violet-300 uppercase">Date & Time</p>
                          <p className="text-3xl font-bold text-white">Saturday</p>
                          <p className="text-xl font-medium text-slate-200">October 1, 2022</p>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-xl border border-transparent bg-violet-500/10 px-6 py-4 backdrop-blur-sm transition-all duration-500 group-hover:border-violet-400/60">
                          <p className="text-4xl font-bold text-violet-300">11</p>
                          <p className="text-lg font-semibold text-violet-400">A.M.</p>
                        </div>
                      </div>
                    </div>

                    <div
                      id="event-info--location-container"
                      className="group relative overflow-hidden rounded-2xl border-t border-b border-violet-500/20 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/20"
                    >
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-6">
                        <div className="flex justify-center">
                          <div className="flex h-20 w-20 items-center justify-center rounded-xl">
                            <i className="fa-solid fa-location-dot text-6xl text-white"></i>
                          </div>
                        </div>
                        <div className="flex flex-col text-center md:text-left">
                          <p className="mb-2 text-sm font-semibold tracking-wider text-violet-300 uppercase">Location</p>
                          <p className="text-xl leading-tight font-bold text-white">{eventInfo.location}</p>
                          <p className="mb-3 text-lg font-medium text-slate-200">{eventInfo.locationAddress}</p>
                          <div>
                            <a
                              href="https://www.google.com/maps/place/Johnson+Park+Seventh-day+Adventist+Church/@25.0650875,-77.3587031,19z/data=!4m5!3m4!1s0x0:0xbe56e30e94ae0311!8m2!3d25.0651262!4d-77.3581687"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-violet-500/20 px-4 py-2 text-sm font-semibold text-violet-300 transition-all duration-200 group-hover:border-violet-400/60 group-hover:duration-500 hover:bg-violet-500/30 hover:text-violet-200"
                            >
                              <i className="fa-solid fa-map-location-dot"></i>
                              View on Google Maps
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </main>
  );
}
