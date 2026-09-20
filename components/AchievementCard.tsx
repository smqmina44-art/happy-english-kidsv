import { Lock } from "lucide-react";
export function AchievementCard({ emoji, title, text, unlocked }: { emoji: string; title: string; text: string; unlocked: boolean }) {
  return <div className={`achievement ${unlocked ? "unlocked" : "locked"}`}><div className="achievement-icon" aria-hidden="true">{unlocked ? emoji : <Lock size={27}/>}</div><div><h3>{title}</h3><p>{text}</p></div>{unlocked && <span className="check">✓</span>}</div>;
}
