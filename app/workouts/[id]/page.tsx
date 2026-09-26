import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/Navbar";
import WorkoutActions from "@/components/WorkoutActions";
import { getWorkoutById } from "@/lib/api";

export default async function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    return (
      <div className="flex flex-1 flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 text-center">
          <h1 className="text-3xl font-bold">Workout not found</h1>
          <Link href="/" className="mt-6 inline-flex text-[#ccff00] hover:underline">Back to library</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ccff00]">
          <ArrowLeft className="h-4 w-4" /> Back to library
        </Link>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:sticky lg:top-24">
            <Image src={workout.image} alt={workout.name} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>
          <article>
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span key={group} className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black">{group}</span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-extrabold uppercase leading-tight sm:text-5xl">{workout.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-400">{workout.description}</p>

            <section className="mt-8 rounded-2xl border border-white/10 bg-[#111] p-5">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">KEY SPECS</h2>
              <dl className="mt-4 divide-y divide-white/10">
                {[
                  ["Equipment", workout.equipment],
                  ["Difficulty", workout.difficulty],
                  ["Sets", String(workout.sets)],
                  ["Reps", workout.reps],
                  ["Duration", `${workout.duration} min`],
                  ["Calories", `${workout.caloriesBurned} kcal`],
                  ["Rating", `${workout.rating} / 5`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <dt className="text-gray-500">{label}</dt><dd className="font-semibold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-8">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">INSTRUCTIONS</h2>
              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li key={instruction} className="flex gap-4 text-sm leading-relaxed text-gray-300">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 font-bold text-[#ccff00]">{index + 1}</span>
                    <span className="pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>
            <div className="mt-9"><WorkoutActions workoutId={workout.id} /></div>
          </article>
        </div>
      </main>
    </div>
  );
}
