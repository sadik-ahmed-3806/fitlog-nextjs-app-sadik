import Image from "next/image";
import { ArrowRight } from "lucide-react";
import bannerImage from "./assets/banner.png";

export default function Hero() {
  return (
    <section id="library" className="mx-auto max-w-7xl px-6 pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] px-8 py-14 sm:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="mt-4 font-sans text-5xl font-bold uppercase leading-[1.05] text-white sm:text-6xl">
              Train with intent.
              <br />
              Log every set.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
            >
              Browse workouts
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* Banner image */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
            <Image
              src={bannerImage}
              alt="Anatomical illustration of an athlete on an exercise bike"
              fill
              sizes="(min-width: 1024px) 448px, 0px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
