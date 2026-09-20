"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initialProgress, loadProgress, resetProgress as clearStored, saveProgress, touchStudyDay } from "@/lib/progress";
import type { CategoryId, ProgressState } from "@/types";

type ContextValue = {
  progress: ProgressState; ready: boolean;
  learnWord: (key: string, category: CategoryId, position: number) => boolean;
  completeLesson: (category: CategoryId) => boolean;
  answerQuiz: (correct: boolean) => void;
  completeQuiz: () => void;
  resetAll: () => void;
};

const ProgressContext = createContext<ContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(initialProgress);
  const [ready, setReady] = useState(false);
  useEffect(() => { const id = window.setTimeout(() => { setProgress(loadProgress()); setReady(true); }, 0); return () => window.clearTimeout(id); }, []);
  useEffect(() => { if (ready) saveProgress(progress); }, [progress, ready]);

  const update = useCallback((recipe: (state: ProgressState) => ProgressState) =>
    setProgress((state) => touchStudyDay(recipe(state))), []);
  const learnWord = useCallback((key: string, category: CategoryId, position: number) => {
    let isNew = false;
    update((state) => {
      isNew = !state.learnedWords.includes(key);
      return { ...state, stars: state.stars + (isNew ? 1 : 0), learnedWords: isNew ? [...state.learnedWords, key] : state.learnedWords, lastCategory: category, lessonPositions: { ...state.lessonPositions, [category]: position }, sessionMinutes: state.sessionMinutes + (isNew ? 1 : 0) };
    });
    return isNew;
  }, [update]);
  const completeLesson = useCallback((category: CategoryId) => {
    let fresh = false;
    update((state) => { fresh = !state.completedLessons.includes(category); return { ...state, stars: state.stars + (fresh ? 5 : 0), completedLessons: fresh ? [...state.completedLessons, category] : state.completedLessons }; });
    return fresh;
  }, [update]);
  const answerQuiz = useCallback((correct: boolean) => update((state) => ({ ...state, stars: state.stars + (correct ? 2 : 0), quizScore: state.quizScore + (correct ? 1 : 0), quizQuestions: state.quizQuestions + 1 })), [update]);
  const completeQuiz = useCallback(() => update((state) => ({ ...state, stars: state.stars + 10 })), [update]);
  const resetAll = useCallback(() => { clearStored(); setProgress(initialProgress); }, []);
  const value = useMemo(() => ({ progress, ready, learnWord, completeLesson, answerQuiz, completeQuiz, resetAll }), [progress, ready, learnWord, completeLesson, answerQuiz, completeQuiz, resetAll]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress must be used inside ProgressProvider");
  return value;
}
