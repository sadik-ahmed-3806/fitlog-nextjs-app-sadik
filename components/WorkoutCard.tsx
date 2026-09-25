import { Clock, Flame, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/lib/api";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-colors hover:border-white/25"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#ccff00] px-2.5 py-1 text-xs font-bold text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white">{workout.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{workout.equipment}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-current text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
