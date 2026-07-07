export function playTone(type) {
  if (type !== 'airhorn') return;

  const audio = new Audio('/audio/airhorn.mp3');
  audio.volume = 1;
  audio.play().catch(() => {});
}