import { Logo } from '@/components/Logo';
import { EventTitle } from '@/components/EventTitle';
import { eventInfo } from '@/constants/eventInfo';
import { Space } from '@/components/Space';
import { AudioPlayer } from '@/components/AudioPlayer';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function App() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-violet-900/60 to-purple-900/40 text-slate-50">
      <AuroraBackground>
        <div className="flex min-h-screen flex-col">
          {/* Header section - stays at top */}
          <div className="px-6">
            <Logo className="pt-4" />
          </div>

          {/* Main content*/}
          <div className="flex flex-1 items-center px-6">
            <div className="w-full">
              <Space paddingX={8} />

              {/* EventTitle on smaller screens */}
              <div className="lg:hidden">
                <EventTitle />
                <Space paddingX={8} />
              </div>

              {/* Grid layout for larger screens */}
              <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                <div className="flex justify-center lg:justify-end">
                  <img src={eventInfo.albumCover} alt="album-cover" className="w-104 rounded-sm drop-shadow-lg lg:w-lg" />
                </div>

                {/* Content column */}
                <div className="lg:max-w-none">
                  {/* EventTitle on large screens */}
                  <div className="hidden lg:block">
                    <EventTitle />
                  </div>

                  <Space paddingX={8} />
                  <p className="font-roboto mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none">
                    You are cordially invited to the live debut performance of <span className="text-violet-400">God Our Only Hope</span>, written and composed by new Bahamian
                    gospel music artist, <span className="text-violet-400">Daniel Bostwick</span>.
                  </p>
                  <Space paddingX={8} />

                  <section id="event-info-container" className="mx-auto max-w-2xl space-y-6 py-6 lg:mx-0 lg:max-w-none">
                    <div id="event-info--date-time-container" className="grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-2">
                      <div className="flex justify-center">
                        <i className="fa-solid fa-calendar text-7xl"></i>
                      </div>
                      <div className="flex flex-col text-center md:pl-2 md:text-left">
                        <p className="font-bold text-violet-300">Date & Time</p>
                        <p className="text-2xl font-semibold">Saturday</p>
                        <p className="-mt-2 text-2xl">October 1, 2022</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-3xl font-medium">11 A.M.</p>
                      </div>
                    </div>

                    <div id="event-info--location-container" className="grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-2">
                      <div className="flex justify-center">
                        <i className="fa-solid fa-location-dot text-7xl"></i>
                      </div>
                      <div className="flex flex-col text-center md:pl-2 md:text-left">
                        <p className="font-bold text-violet-300">Location</p>
                        <p className="text-2xl leading-7 font-semibold">{eventInfo.location}</p>
                        <p className="text-2xl">{eventInfo.locationAddress}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-1 md:pl-2">
                        <a
                          href="https://www.google.com/maps/place/Johnson+Park+Seventh-day+Adventist+Church/@25.0650875,-77.3587031,19z/data=!4m5!3m4!1s0x0:0xbe56e30e94ae0311!8m2!3d25.0651262!4d-77.3581687"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer text-sm underline hover:text-violet-300"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  </section>

                  <Space paddingX={8} />
                  <AudioPlayer audioSrc="god-our-only-hope.mp3" albumCover={eventInfo.albumCover} title={eventInfo.title} artist="Daniel Bostwick" repeatAudio={true} />
                  <Space paddingX={8} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </main>
  );
}
