"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { lessonMap } from "@/data/lessons";
import { WordCard } from "@/components/WordCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Celebration } from "@/components/Celebration";
import { useProgress } from "@/components/ProgressProvider";
import type { CategoryId } from "@/types";

export function LessonExperience({ category }: { category: string }) {
  const lesson = lessonMap[category as CategoryId];
  const { progress, learnWord, completeLesson } = useProgress();
  const [index, setIndex] = useState(() => Math.min(progress.lessonPositions[category as CategoryId] ?? 0, (lesson?.words.length ?? 1) - 1));
  const [complete, setComplete] = useState(false);
  const [starPop, setStarPop] = useState(false);
  if (!lesson) return <main className="page-shell inner-page"><h1>Lesson not found</h1><Link href="/learn">Back to lessons</Link></main>;
  const item = lesson.words[index];
  const mark = () => {
    if (learnWord(`${lesson.id}:${item.word}`, lesson.id, index)) {
      setStarPop(true);
      setTimeout(() => setStarPop(false), 700);
    }
  };
  const next = () => {
    mark();
    if (index === lesson.words.length - 1) {
      completeLesson(lesson.id);
      setComplete(true);
    } else setIndex((value) => value + 1);
  };
  return <main className="lesson-page page-shell"><div className="lesson-status"><div><strong>{lesson.emoji} {lesson.name}</strong><span>{index + 1} / {lesson.words.length}</span></div><ProgressBar value={(index + 1) / lesson.words.length * 100} color={lesson.color}/></div>{starPop && <div className="star-pop" role="status">+1 ⭐</div>}<WordCard item={item} onLearned={mark}/><div className="lesson-nav"><button onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0} className="soft-button"><ArrowLeft/> Back</button><button onClick={next} className="primary-button">{index === lesson.words.length - 1 ? "Finish" : "Next"} <ArrowRight/></button></div>{complete && <Celebration message={`You learned ${lesson.words.length} new words!`}/>}</main>;
}
