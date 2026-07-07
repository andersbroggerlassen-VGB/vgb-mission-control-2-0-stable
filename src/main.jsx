import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { subscribeState } from './lib/firebase.js';
import { getRemainingSeconds } from './lib/time.js';
import { playTone } from './lib/audio.js';
import './styles.css';

function Root() {
  const [state, setState] = useState(null);
  const [tick, setTick] = useState(Date.now());
  const [lastSound, setLastSound] = useState(0);

  useEffect(() => subscribeState(setState), []);
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

    useEffect(() => {
    const path = window.location.pathname;

    if (path !== '/score' && path !== '/tactical') return;
    if (!state?.soundEvent?.at || state.soundEvent.at === lastSound) return;

    setLastSound(state.soundEvent.at);
    playTone(state.soundEvent.type);
  }, [state?.soundEvent?.at, lastSound]);

  const computed = useMemo(() => {
    if (!state) return null;
    const remaining = getRemainingSeconds(state);
    const displayStatus = state.status === 'LIVE' && remaining <= 0 ? 'COMPLETE' : state.status;
    return { ...state, remaining, displayStatus };
  }, [state, tick]);

  if (!computed) return <div className="boot">INITIALISERER MISSION CONTROL...</div>;
  return <App state={computed} />;
}

createRoot(document.getElementById('root')).render(<Root />);
