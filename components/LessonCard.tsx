"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Lesson } from "@/types";
import { useProgress } from "./ProgressProvider";
import { ProgressBar } from "./ProgressBar";

export function LessonCard({ lesson, compact = false }: { lesson: Lesson; compact?: boolean }) {
  const { progress } = useProgress();
  const count = lesson.words.filter((w) => progress.learnedWords.includes(`${lesson.id}:${w.word}`)).length;
  const percent = count / lesson.words.length * 100;
  const complete = count === lesson.words.length;
  return <Link href={`/learn/${lesson.id}`} aria-label={`${count ? "Continue" : "Start"} ${lesson.name}, ${count} of ${lesson.words.length} words learned`} className={`lesson-card ${compact ? "compact" : ""} ${complete ? "is-complete" : ""}`} style={{ "--lesson": lesson.color } as React.CSSProperties}>
    <div className="lesson-emoji" role="img" aria-label={lesson.name}>{lesson.emoji}</div>
    <div className="lesson-copy"><div className="lesson-heading"><h3>{lesson.name}</h3><span>{complete ? "✓ Done" : `${count}/${lesson.words.length}`}</span></div>{!compact && <p>{lesson.description}</p>}<ProgressBar value={percent} color={lesson.color}/>{!compact && <div className="lesson-action">{complete ? "Practice again" : count ? "Continue" : "Start"}<ArrowRight size={18}/></div>}</div>
  </Link>;
}
