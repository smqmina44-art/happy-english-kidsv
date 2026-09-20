"use client";
import { useEffect, useState } from "react";
import { Mic, Volume2 } from "lucide-react";
import { getSpeechRecognition, speak } from "@/lib/speech";
import type { WordItem } from "@/types";
export function WordCard({ item, onLearned }: { item: WordItem; onLearned: () => void }) {
  const [speaking, setSpeaking] = useState(false); const [message, setMessage] = useState("");
  useEffect(() => { const id = setTimeout(() => speak(item.word), 350); return () => clearTimeout(id); }, [item]);
  const listen = () => { speak(item.word); onLearned(); };
  const practice = () => { const Recognition = getSpeechRecognition(); if (!Recognition) { setMessage("Speaking practice is not supported on this browser."); return; } const recognition = new Recognition(); recognition.lang = "en-US"; recognition.interimResults = false; recognition.maxAlternatives = 1; setSpeaking(true); setMessage("I’m listening… say it! 👂"); recognition.onresult = (event) => { const heard = event.results[0][0].transcript.toLowerCase(); const good = heard.includes(item.word.toLowerCase()); setMessage(good ? "Great speaking! 🌟" : "Nice try! Listen and try once more 😊"); if (good) onLearned(); }; recognition.onerror = () => setMessage("I couldn’t hear that. Try again 😊"); recognition.onend = () => setSpeaking(false); recognition.start(); };
  return <article className="word-card"><div className="word-card-kicker">LOOK • LISTEN • SAY</div><div className="word-emoji" role="img" aria-label={item.word}>{item.emoji}</div><h1>{item.word.toUpperCase()}</h1><p className="pronunciation">{item.pronunciation}</p><p className="translation">{item.chinese}</p><p className="example">“{item.example}”</p><div className="word-actions"><button className="listen-button" onClick={listen}><Volume2/> Listen</button><button className={`speak-button ${speaking ? "listening" : ""}`} onClick={practice} disabled={speaking}><Mic/> {speaking ? "Listening…" : "Speak"}</button></div>{message && <p className="speech-message" role="status">{message}</p>}</article>;
}
