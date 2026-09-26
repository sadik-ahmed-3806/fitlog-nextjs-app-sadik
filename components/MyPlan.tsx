"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, Check, Clock3, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/lib/api";
import { usePlanStore } from "@/plan-store";

export default function MyPlan() {
  const { planIds, savedIds, toggleInPlan, toggleSaved } = usePlanStore();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch("/api/fitlog")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load workouts");
        return response.json() as Promise<Workout[]>;
      })
      .then((data) => {
        if (!isMounted) return;
        if (!Array.isArray(data)) throw new Error("Invalid workout response");
        setWorkouts(data);
      })
      .catch(() => {
        if (isMounted) setLoadError("We couldn't load your workouts. Please try again.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const ids = tab === "plan" ? planIds : savedIds;
  const selected = useMemo(
    () => ids
      .map((id) => workouts.find((workout) => String(workout.id) === id))
      .filter((workout): workout is Workout => Boolean(workout)),
    [ids, workouts],
  );
  const planned = useMemo(
    () => planIds
      .map((id) => workouts.find((workout) => String(workout.id) === id))
      .filter((workout): workout is Workout => Boolean(workout)),
    [planIds, workouts],
  );
  const metrics = useMemo(
    () => planned.reduce(
      (totals, workout) => ({
        exercises: totals.exercises + 1,
        minutes: totals.minutes + workout.duration,
        calories: totals.calories + workout.caloriesBurned,
      }),
      { exercises: 0, minutes: 0, calories: 0 },
    ),
    [planned],
  );

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 sm:px-8 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">MY PLAN</h1>
        <p className="mt-4 text-base text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </header>

      <section aria-label="Plan metrics" className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          ["Exercises", metrics.exercises],
          ["Minutes", metrics.minutes],
          ["Calories", metrics.calories],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-[#111] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-white">{value}</p>
          </div>
        ))}
      </section>

      <div role="tablist" aria-label="Workout lists" className="mt-12 flex gap-7 border-b border-white/10">
        {([
          ["plan", "Today's Plan", planIds.length],
          ["saved", "Saved", savedIds.length],
        ] as const)
          .map(([value, label, count]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={`border-b-2 pb-4 text-sm font-bold transition-colors ${
                tab === value
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              {label} <span className="ml-1 text-xs text-current/70">({count})</span>
            </button>
          ))}
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-gray-400">Loading workouts…</p>
      ) : loadError ? (
        <p role="alert" className="py-16 text-center text-sm text-red-300">{loadError}</p>
      ) : selected.length === 0 ? (
        <div className="py-20 text-center">
          <Bookmark aria-hidden="true" className="mx-auto h-9 w-9 text-[#ccff00]" />
          <h2 className="mt-5 text-xl font-extrabold uppercase">Nothing here yet</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="mt-7 inline-flex rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {selected.map((workout) => (
            <article key={workout.id} className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#111] p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-52 sm:aspect-auto">
                <Image src={workout.image} alt={workout.name} fill sizes="(min-width: 640px) 208px, 100vw" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ccff00]">{workout.muscleGroups[0]}</p>
                <h2 className="mt-2 truncate text-xl font-extrabold uppercase">{workout.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{workout.equipment}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{workout.duration} min</span>
                  <span className="inline-flex items-center gap-1.5"><Flame className="h-4 w-4" />{workout.caloriesBurned} kcal</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-[#ccff00] text-[#ccff00]" />{workout.rating}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Link href={`/workouts/${workout.id}`} className="rounded-lg border border-white/20 px-3 py-2 text-xs font-bold text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00]">
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    type="button"
                    disabled={completedIds.includes(String(workout.id))}
                    onClick={() => setCompletedIds((ids) => [...ids, String(workout.id)])}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#ccff00]/50 px-3 py-2 text-xs font-bold text-[#ccff00] transition-colors hover:bg-[#ccff00] hover:text-black disabled:cursor-default disabled:bg-[#ccff00] disabled:text-black"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {completedIds.includes(String(workout.id)) ? "Done" : "Mark as Done"}
                  </button>
                )}
                <button
                  type="button"
                  aria-label={`Remove ${workout.name}`}
                  onClick={() => {
                    const id = String(workout.id);
                    if (tab === "plan") {
                      toggleInPlan(id);
                      setCompletedIds((ids) => ids.filter((completedId) => completedId !== id));
                    } else {
                      toggleSaved(id);
                    }
                  }}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
