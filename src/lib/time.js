export function getRemainingSeconds(state) {
  if (!state) return 0;
  if (state.status === 'LIVE' && state.endsAt) {
    return Math.max(0, Math.ceil((Number(state.endsAt) - Date.now()) / 1000));
  }
  return Math.max(0, Number(state.remaining ?? state.duration ?? 900));
}

export function formatTime(seconds) {
  const s = Math.max(0, Number(seconds) || 0);
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const r = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
}
