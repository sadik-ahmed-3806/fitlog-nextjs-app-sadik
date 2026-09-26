import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-[#ccff00]" strokeWidth={2.5} aria-hidden="true" />
          <span className="text-lg font-extrabold tracking-wide">FITLOG</span>
        </div>
        <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
