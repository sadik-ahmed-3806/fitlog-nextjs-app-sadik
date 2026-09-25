"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, CalendarDays } from "lucide-react";
import type { Workout } from "@/lib/api";
import { usePlanStore } from "@/plan-store";

export default function MyPlan() {
  const { planIds, savedIds } = usePlanStore();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  useEffect(() => {
    fetch("/api/fitlog")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load workouts");
        return response.json() as Promise<Workout[]>;
      })
      .then(setWorkouts)
      .catch(() => setWorkouts([]));
  }, []);

  const ids = tab === "plan" ? planIds : savedIds;
  const selected = workouts.filter((workout) => ids.includes(String(workout.id)));

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">YOUR WORKOUTS</p>
      <h1 className="mt-3 text-4xl font-extrabold uppercase">My Plan</h1>
      <div className="mt-8 flex gap-2 border-b border-white/10">
        <button type="button" onClick={() => setTab("plan")} className={`border-b-2 px-4 pb-3 text-sm font-bold ${tab === "plan" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-500"}`}>
          Today&apos;s Plan ({planIds.length})
        </button>
        <button type="button" onClick={() => setTab("saved")} className={`border-b-2 px-4 pb-3 text-sm font-bold ${tab === "saved" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-500"}`}>
          Saved ({savedIds.length})
        </button>
      </div>
      {selected.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-12 text-center text-gray-500">
          {tab === "plan" ? <CalendarDays className="mx-auto mb-4 h-8 w-8" /> : <Bookmark className="mx-auto mb-4 h-8 w-8" />}
          No workouts here yet. Browse the library to add one.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((workout) => (
            <div key={workout.id} className="rounded-2xl border border-white/10 bg-[#111] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">{workout.muscleGroups.join(" / ")}</p>
              <h2 className="mt-3 text-xl font-bold uppercase">{workout.name}</h2>
              <p className="mt-2 text-sm text-gray-500">{workout.duration} min · {workout.caloriesBurned} kcal</p>
              <Link href={`/workouts/${workout.id}`} className="mt-5 inline-flex rounded-md border border-white/20 px-4 py-2 text-sm font-semibold hover:border-[#ccff00] hover:text-[#ccff00]">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
