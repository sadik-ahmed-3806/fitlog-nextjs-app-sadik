"use client";

import { Bookmark, Check, Plus } from "lucide-react";
import { useState } from "react";
import { usePlanStore } from "@/plan-store";

export default function WorkoutActions({ workoutId }: { workoutId: number }) {
  const { isInPlan, isSaved, toggleInPlan, toggleSaved } = usePlanStore();
  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function addToPlan() {
    if (!isInPlan(String(workoutId))) {
      if (toggleInPlan(String(workoutId))) {
        showToast("Added to today's plan");
      } else {
        showToast("Today's plan is full. Remove a lift to add another.");
      }
    } else {
      showToast("Already in today's plan");
    }
  }

  function saveForLater() {
    if (!isSaved(String(workoutId))) {
      toggleSaved(String(workoutId));
      showToast("Saved for later");
    } else {
      showToast("Already saved for later");
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addToPlan}
          className="inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
        >
          {isInPlan(String(workoutId)) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {isInPlan(String(workoutId)) ? "In today's plan" : "Add to today's plan"}
        </button>
        <button
          type="button"
          onClick={saveForLater}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          {isSaved(String(workoutId)) ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          {isSaved(String(workoutId)) ? "Saved" : "Save for later"}
        </button>
      </div>
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#ccff00] px-4 py-3 text-sm font-bold text-black shadow-xl">
          {toast}
        </div>
      )}
    </>
  );
}
