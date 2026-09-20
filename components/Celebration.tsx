"use client";
import Link from "next/link";
export function Celebration({ title = "Amazing!", message, onClose }: { title?: string; message: string; onClose?: () => void }) {
  return <div className="celebration" role="dialog" aria-modal="true" aria-labelledby="celebration-title"><div className="confetti" aria-hidden="true">⭐ ✨ 🌟</div><div className="celebration-card"><div className="big-celebrate">🎉</div><h2 id="celebration-title">{title}</h2><p>{message}</p><strong className="reward">+5 ⭐</strong><div className="celebration-actions"><Link href="/quiz" className="primary-button">Play Quiz 🎮</Link><Link href="/" className="soft-button" onClick={onClose}>Back Home</Link></div></div></div>;
}
