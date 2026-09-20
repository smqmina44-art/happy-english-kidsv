export function speak(text: string, rate = 0.78) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1.08;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function getSpeechRecognition(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  const speechWindow = window as typeof window & { webkitSpeechRecognition?: new () => SpeechRecognition };
  return window.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

declare global {
  interface SpeechRecognitionEvent extends Event { results: SpeechRecognitionResultList }
  interface SpeechRecognitionErrorEvent extends Event { error: string }
  interface SpeechRecognition extends EventTarget {
    lang: string; interimResults: boolean; maxAlternatives: number;
    start(): void; stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
  }
  var SpeechRecognition: (new () => SpeechRecognition) | undefined;
}
