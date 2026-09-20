"use client";
import Link from "next/link";
import { ArrowRight, Flame, Trophy } from "lucide-react";
import { lessons, lessonMap } from "@/data/lessons";
import { LessonCard } from "@/components/LessonCard";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/components/ProgressProvider";
import { todayKey } from "@/lib/progress";
export default function Home() {
  const { progress } = useProgress(); const recent = lessonMap[progress.lastCategory];
  const todayLearned = progress.lastStudyDate === todayKey() ? Math.min(5, progress.learnedWords.length) : 0;
  return <main><section className="hero page-shell"><div className="hero-copy"><div className="eyebrow">🌟 A LITTLE ENGLISH ADVENTURE</div><h1>Let’s Learn<br/><span>English!</span></h1><p>Play, listen, speak and learn!</p><div className="hero-buttons"><Link href="/learn" className="primary-button">Start Learning 🚀</Link>{progress.learnedWords.length > 0 && <Link href={`/learn/${recent.id}`} className="continue-link">Continue {recent.name} <ArrowRight size={18}/></Link>}</div></div><div className="hero-art" aria-label="Happy bear learning English" role="img"><div className="sun">☀️</div><div className="cloud cloud-a">☁️</div><div className="cloud cloud-b">☁️</div><div className="rainbow">🌈</div><div className="mascot">🐻<span>ABC</span></div><div className="floating-star">⭐</div></div></section><section className="page-shell goal-section"><div className="section-title"><div><span>YOUR DAILY MISSION</span><h2>Today’s Goal</h2></div><div className="streak"><Flame/> {progress.streak} Day Streak</div></div><div className="goal-card"><div className="goal-icon">⭐</div><div className="goal-main"><div><strong>Learn 5 words</strong><span>{todayLearned} of 5 complete</span></div><ProgressBar value={todayLearned / 5 * 100} color="#ffc93c"/></div><div className="goal-stars" aria-label={`${todayLearned} out of 5 stars`}>{[0,1,2,3,4].map((i) => <span key={i} className={i < todayLearned ? "earned" : ""}>★</span>)}</div><div className="goal-reward"><Trophy/> Earn 20 stars</div></div></section><section className="page-shell adventures"><div className="section-title"><div><span>PICK A PATH</span><h2>Choose Your Adventure</h2></div><Link href="/learn">View all <ArrowRight size={17}/></Link></div><div className="lesson-grid">{lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} compact/>)}</div></section></main>;
}
