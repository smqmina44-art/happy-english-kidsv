export function ProgressBar({ value, color = "#3aa7ff", label }: { value: number; color?: string; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="progress-wrap" aria-label={label ?? `${Math.round(safe)}% complete`} role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100}>
    <div className="progress-fill" style={{ width: `${safe}%`, backgroundColor: color }} />
  </div>;
}
