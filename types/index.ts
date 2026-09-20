export type CategoryId = "animals" | "food" | "colors" | "numbers" | "family" | "vehicles";

export type WordItem = {
  word: string;
  pronunciation: string;
  chinese: string;
  emoji: string;
  example: string;
  category: CategoryId;
};

export type Lesson = {
  id: CategoryId;
  name: string;
  emoji: string;
  color: string;
  description: string;
  words: WordItem[];
};

export type ProgressState = {
  stars: number;
  learnedWords: string[];
  completedLessons: CategoryId[];
  quizScore: number;
  quizQuestions: number;
  streak: number;
  lastStudyDate: string;
  lastCategory: CategoryId;
  lessonPositions: Partial<Record<CategoryId, number>>;
  studyDates: string[];
  sessionMinutes: number;
};
