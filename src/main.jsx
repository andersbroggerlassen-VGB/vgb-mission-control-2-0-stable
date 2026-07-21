import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { subscribeState } from './lib/firebase.js';
import { getRemainingSeconds } from './lib/time.js';
import {
  playTone,
  playCountdown,
  playGreenScore,
  playBlueScore,
  playTwoMinutes,
  playBattleEnded,
  playGreenWins,
  playBlueWins
} from './lib/audio.js';
import './styles.css';

function Root() {
  const [state, setState] = useState(null);
  const [tick, setTick] = useState(Date.now());

  useEffect(() => subscribeState(setState), []);

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const computed = useMemo(() => {
    if (!state) return null;
    const remaining = getRemainingSeconds(state);
    const displayStatus = state.status === 'LIVE' && remaining <= 0 ? 'COMPLETE' : state.status;
    return { ...state, remaining, displayStatus };
  }, [state, tick]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/score' && path !== '/tactical') return;
    if (!state?.soundEvent?.at) return;

    const eventId = String(state.soundEvent.at);
    const lastPlayed = localStorage.getItem('vgbLastSoundEvent');

    if (lastPlayed === eventId) return;

    localStorage.setItem('vgbLastSoundEvent', eventId);
 switch (state.soundEvent.type) {
  case 'countdown':
    playCountdown();
    break;

  case 'greenScore':
    playGreenScore();
    break;

  case 'blueScore':
    playBlueScore();
    break;

  case 'twoMinutes':
    playTwoMinutes();
    break;

  case 'battleEnded':
    playBattleEnded();
    break;

  case 'greenWins':
    playGreenWins();
    break;

  case 'blueWins':
    playBlueWins();
    break;

  default:
    playTone(state.soundEvent.type);
}
  }, [state?.soundEvent?.at]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/score' && path !== '/tactical') return;
    if (!computed) return;
    if (computed.status !== 'LIVE') return;
    if (computed.remaining > 0) return;
    if (!computed.endsAt) return;

    const completeId = String(computed.endsAt);
    const lastComplete = localStorage.getItem('vgbLastCompleteSound');

    if (lastComplete === completeId) return;

    localStorage.setItem('vgbLastCompleteSound', completeId);
    playTone('airhorn');
  }, [computed?.remaining, computed?.status, computed?.endsAt]);

  if (!computed) return <div className="boot">INITIALISERER MISSION CONTROL...</div>;
  return <App state={computed} />;
}

createRoot(document.getElementById('root')).render(<Root />);