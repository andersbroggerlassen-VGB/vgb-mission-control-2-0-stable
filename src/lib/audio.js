const tones = {
  start: [220, 440, 660],
  point: [520, 780],
  siren: [380, 700, 380, 700],
  alarm: [180, 180, 180, 180],
  complete: [660, 880, 990]
};

export function playTone(type = 'point') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const seq = tones[type] || tones.point;
    seq.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + i * 0.14 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.14 + 0.12);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.14);
      osc.stop(ctx.currentTime + i * 0.14 + 0.13);
    });
  } catch (err) {
    console.warn('Audio blocked by browser', err);
  }
}
