import { lessons } from "@/data/lessons";
import { LessonExperience } from "./LessonExperience";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ category: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <LessonExperience category={category} />;
}
