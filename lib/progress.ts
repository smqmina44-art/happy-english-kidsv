import type { ProgressState } from "@/types";

export const STORAGE_KEY = "happy-english-progress-v1";
export const todayKey = () => new Date().toISOString().slice(0, 10);

export const initialProgress: ProgressState = {
  stars: 0, learnedWords: [], completedLessons: [], quizScore: 0, quizQuestions: 0,
  streak: 0, lastStudyDate: "", lastCategory: "animals", lessonPositions: {}, studyDates: [], sessionMinutes: 0,
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return initialProgress;
  try { return { ...initialProgress, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return initialProgress; }
}

export function saveProgress(progress: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function touchStudyDay(state: ProgressState): ProgressState {
  const today = todayKey();
  if (state.lastStudyDate === today) return state;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const streak = state.lastStudyDate === yesterday.toISOString().slice(0, 10) ? state.streak + 1 : 1;
  return { ...state, streak, lastStudyDate: today, studyDates: [...new Set([...state.studyDates, today])] };
}

export function resetProgress() { localStorage.removeItem(STORAGE_KEY); }
