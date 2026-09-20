import { lessons } from "@/data/lessons";
import { LessonCard } from "@/components/LessonCard";
export default function LearnPage() { return <main className="page-shell inner-page"><div className="page-heading"><span>📚 READY, SET, LEARN!</span><h1>Pick a lesson</h1><p>Every new word earns a shiny star.</p></div><div className="lesson-grid full">{lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson}/>)}</div></main>; }
