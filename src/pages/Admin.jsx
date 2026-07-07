import { useEffect } from 'react';
import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';
import { patchState, resetState } from '../lib/firebase.js';
import { getRemainingSeconds, formatTime } from '../lib/time.js';

function addEvent(state, text) {
  const time = new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return [...(state.events || []), { time, text }].slice(-20);
}

export default function Admin({ state }) {
  useEffect(() => {
    if (state.status !== 'LIVE' || !state.endsAt) return;
    const id = setInterval(() => {
      const remaining = getRemainingSeconds(state);
      patchState({ remaining, status: remaining <= 0 ? 'COMPLETE' : 'LIVE' });
    }, 1000);
    return () => clearInterval(id);
  }, [state.status, state.endsAt]);

  const setField = (key, value) => patchState({ [key]: value });
  const sound = (type) => patchState({ soundEvent: { type, at: Date.now() }, events: addEvent(state, `Lyd aktiveret: ${type}`) });

  const start = () => {
    const duration = Number(state.duration || state.remaining || 480);
    patchState({
      status: 'LIVE', duration, remaining: duration, endsAt: Date.now() + duration * 1000,
      soundEvent: { type: 'airhorn', at: Date.now() },
      events: addEvent(state, `Mission startet: ${state.missionName}`)
    });
  };

  const pauseResume = () => {
    if (state.status === 'LIVE') {
      const remaining = getRemainingSeconds(state);
      return patchState({ status: 'PAUSED', remaining, endsAt: null, events: addEvent(state, `Mission pauset ved ${formatTime(remaining)}`) });
    }
    if (state.status === 'PAUSED') {
      const remaining = Number(state.remaining || state.duration || 480);
      return patchState({ status: 'LIVE', endsAt: Date.now() + remaining * 1000, events: addEvent(state, 'Mission genoptaget') });
    }
  };

  const stop = () => patchState({ status: 'READY', remaining: Number(state.duration), endsAt: null, redScore: 0, blueScore: 0, events: addEvent(state, 'Mission nulstillet') });
  const point = (team, delta) => {
    const key = team === 'red' ? 'redScore' : 'blueScore';
    const label = team === 'red' ? 'RØD' : 'BLÅ';
    patchState({ [key]: Math.max(0, Number(state[key]) + delta), soundEvent: { type: 'point', at: Date.now() }, events: addEvent(state, `${label} ${delta > 0 ? '+1' : '-1'} point`) });
  };

  return <Layout title="ADMIN PANEL" compact>
    <div className="admin-grid">
      <Panel title="KAMPSTYRING" className="admin-control">
        <div className="admin-status"><strong>{formatTime(state.remaining)}</strong><span>{state.displayStatus}</span></div>
        <div className="buttons"><button onClick={start}>START MISSION</button><button onClick={pauseResume}>PAUSE / GENOPTAG</button><button className="danger" onClick={stop}>STOP / NULSTIL</button></div>
        <div className="buttons"><button className="red" onClick={() => point('red', 1)}>+1 RØD</button><button className="blue" onClick={() => point('blue', 1)}>+1 BLÅ</button><button onClick={() => point('red', -1)}>-1 RØD</button><button onClick={() => point('blue', -1)}>-1 BLÅ</button></div>
        <label>Missionstid i minutter<input type="number" min="1" value={Math.round(Number(state.duration) / 60)} onChange={e => { const d = Math.max(60, Number(e.target.value) * 60); patchState({ duration: d, remaining: d, endsAt: null, status: 'READY' }); }} /></label>
      </Panel>
      <Panel title="MISSION">
        <label>Mission navn<input value={state.missionName} onChange={e => setField('missionName', e.target.value)} /></label>
        <label>Mission type<input value={state.missionType} onChange={e => setField('missionType', e.target.value)} /></label>
        <label>Mission tekst<textarea value={state.missionText} onChange={e => setField('missionText', e.target.value)} /></label>
        <label>Besked til skærme<input value={state.message} onChange={e => setField('message', e.target.value)} /></label>
      </Panel>
      <Panel title="HOLD"><label>Rødt hold<input value={state.redTeam} onChange={e => setField('redTeam', e.target.value)} /></label><label>Blåt hold<input value={state.blueTeam} onChange={e => setField('blueTeam', e.target.value)} /></label></Panel>
      <Panel title="KAMERAER OG KORT">
        <label>Rød kamera URL<input value={state.cameraRedUrl} onChange={e => setField('cameraRedUrl', e.target.value)} /></label>
        <label>Blå kamera URL<input value={state.cameraBlueUrl} onChange={e => setField('cameraBlueUrl', e.target.value)} /></label>
        <label>Overblik kamera URL<input value={state.cameraOverviewUrl} onChange={e => setField('cameraOverviewUrl', e.target.value)} /></label>
        <label>Banekort URL<input value={state.m<Panel title="LYDEFFEKTER"><div className="buttons"><button onClick={() => sound('airhorn')}>AIRHORN</button></div></Panel>apUrl} onChange={e => setField('mapUrl', e.target.value)} /></label>
      </Panel>
      <Panel title="LYDEFFEKTER"><div className="buttons"><button onClick={() => sound('siren')}>SIRENE</button><button onClick={() => sound('alarm')}>ALARM</button><button onClick={() => sound('complete')}>MISSION COMPLETE</button><button onClick={() => sound('start')}>START LYD</button></div></Panel>
      <Panel title="SYSTEM"><button className="danger wide" onClick={resetState}>RESET ALT</button></Panel>
    </div>
  </Layout>;
}
