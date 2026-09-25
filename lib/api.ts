/**
 * Data layer for the FitLog API.
 *
 *   GET /api/fitlog       -> Workout[]
 *   GET /api/fitlog/:id   -> Workout
 */

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

async function fetchJson<T>(url: string, revalidateSeconds = 300): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    throw new Error(`FitLog API request failed (${response.status}): ${url}`);
  }

  return response.json() as Promise<T>;
}

export function getWorkouts(): Promise<Workout[]> {
  return fetchJson<Workout[]>(API_BASE);
}

export async function getWorkoutById(
  id: number | string,
): Promise<Workout | null> {
  const response = await fetch(`${API_BASE}/${id}`, {
    next: { revalidate: 300 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `FitLog API request failed (${response.status}): ${API_BASE}/${id}`,
    );
  }

  return response.json() as Promise<Workout>;
}
