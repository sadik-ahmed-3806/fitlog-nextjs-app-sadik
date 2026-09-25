import { NextResponse } from "next/server";
import { getWorkouts } from "@/lib/api";

export async function GET() {
  try {
    return NextResponse.json(await getWorkouts());
  } catch {
    return NextResponse.json({ error: "Unable to load workouts" }, { status: 502 });
  }
}
