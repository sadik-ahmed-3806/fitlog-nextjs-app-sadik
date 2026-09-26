export type Workout = {
  id: string; name: string; category: string[]; equipment: string; duration: number;
  calories: number; rating: number; difficulty: string; sets: number; reps: string;
  description: string; instructions: string[]; image?: string;
};
