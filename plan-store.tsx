"use client";

/**
 * Lightweight global store for the "Plan" and "Saved" counters shown in the
 * Navbar. Both counters are backed by localStorage so they survive reloads,
 * and are exposed through a React Context so any component (workout cards,
 * the /my-plan page, etc.) can read or update them.
 *
 * Wrap the app once in app/layout.tsx:
 *
 *   import { PlanProvider } from "@/lib/plan-store";
 *   ...
 *   <PlanProvider>{children}</PlanProvider>
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

type PlanContextValue = {
  planIds: string[];
  savedIds: string[];
  planCount: number;
  savedCount: number;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  toggleInPlan: (id: string) => void;
  toggleSaved: (id: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPlanIds(readIds(PLAN_KEY));
      setSavedIds(readIds(SAVED_KEY));
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(PLAN_KEY, JSON.stringify(planIds));
    }
  }, [hydrated, planIds]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    }
  }, [hydrated, savedIds]);

  const toggleInPlan = useCallback((id: string) => {
    setPlanIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const value = useMemo<PlanContextValue>(
    () => ({
      planIds,
      savedIds,
      planCount: planIds.length,
      savedCount: savedIds.length,
      isInPlan: (id) => planIds.includes(id),
      isSaved: (id) => savedIds.includes(id),
      toggleInPlan,
      toggleSaved,
    }),
    [planIds, savedIds, toggleInPlan, toggleSaved]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlanStore() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlanStore must be used within a <PlanProvider>");
  }
  return ctx;
}
