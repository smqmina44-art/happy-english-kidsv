"use client";
import { useProgress } from "@/components/ProgressProvider";
export function StarCounter() {
  const { progress } = useProgress();
  return <div className="star-counter" aria-label={`${progress.stars} stars`}><span aria-hidden="true">⭐</span><strong>{progress.stars}</strong></div>;
}
