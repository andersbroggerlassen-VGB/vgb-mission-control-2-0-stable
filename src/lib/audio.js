const sounds = {
  airhorn: '/audio/airhorn.mp3',
  ready: '/audio/ready.mp3',
  countdown: '/audio/countdown.mp3',
  greenScore: '/audio/green-score.mp3',
  blueScore: '/audio/blue-score.mp3',
  twoMinutes: '/audio/two-minutes.mp3',
  battleEnded: '/audio/battle-ended.mp3',
  greenWins: '/audio/green-wins.mp3',
  blueWins: '/audio/blue-wins.mp3'
};

function play(src) {
  return new Promise((resolve) => {
    const audio = new Audio(src);

    audio.volume = 1;

    audio.onended = () => resolve();

    audio.onerror = () => resolve();

    audio.play().catch(() => resolve());
  });
}

export function playTone(type) {
  if (!sounds[type]) return;

  return play(sounds[type]);
}

export const playReady = () => play(sounds.ready);

export const playCountdown = () => play(sounds.countdown);

export const playAirhorn = () => play(sounds.airhorn);

export const playGreenScore = () => play(sounds.greenScore);

export const playBlueScore = () => play(sounds.blueScore);

export const playTwoMinutes = () => play(sounds.twoMinutes);

export const playBattleEnded = () => play(sounds.battleEnded);

export const playGreenWins = () => play(sounds.greenWins);

export const playBlueWins = () => play(sounds.blueWins);

export async function playStartSequence() {
  await playCountdown();
  await playAirhorn();
}

export async function playEndSequence(winner) {
  await playBattleEnded();

  await new Promise(r => setTimeout(r, 1000));

  if (winner === 'green') {
    await playGreenWins();
  } else {
    await playBlueWins();
  }
}