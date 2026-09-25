import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Library() {
  let workouts: Awaited<ReturnType<typeof getWorkouts>> = [];
  let loadError = false;

  try {
    workouts = await getWorkouts();
  } catch {
    loadError = true;
  }

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <h2 className="text-3xl font-bold text-white">THE LIBRARY</h2>
      <p className="mt-2 text-gray-400">
        {workouts.length > 0
          ? `${workouts.length} lifts covering every major muscle group.`
          : "Lifts covering every major muscle group."}
      </p>

      {loadError && (
        <p className="mt-8 rounded-xl border border-white/10 bg-[#111111] p-6 text-sm text-gray-400">
          Couldn&apos;t load the workout library right now. Try refreshing the
          page.
        </p>
      )}

      {!loadError && workouts.length === 0 && (
        <p className="mt-8 rounded-xl border border-white/10 bg-[#111111] p-6 text-sm text-gray-400">
          No workouts found.
        </p>
      )}

      {workouts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
