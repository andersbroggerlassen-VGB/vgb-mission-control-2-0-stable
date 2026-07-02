import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';
import Scoreboard from '../components/Scoreboard.jsx';
import CameraFrame from '../components/CameraFrame.jsx';
import EventFeed from '../components/EventFeed.jsx';
import { formatTime } from '../lib/time.js';

export default function Dashboard({ state }) {
  return <Layout title="MISSION CONTROL">
    <div className="dashboard-grid">
      <Panel title="MISSION BRIEFING" className="mission-panel">
        <div className="mission-icon">⚑</div>
        <h1>{state.missionName}</h1>
        <h3>{state.missionType}</h3>
        <p>{state.missionText}</p>
        <div className="rule-cards">{state.rules.map((rule, i) => <span key={i}>{rule}</span>)}</div>
        <div className="mini-time">{formatTime(state.duration)}</div>
      </Panel>
      <Panel title="LIVE SCOREBOARD" className="score-panel"><Scoreboard state={state} /></Panel>
      <Panel title="LIVE CAMERA - RØD" className="camera-panel red-cam"><CameraFrame title="Rød kamera" subtitle="RØD BASE" url={state.cameraRedUrl} /></Panel>
      <Panel title="LIVE CAMERA - BLÅ" className="camera-panel"><CameraFrame title="Blå kamera" subtitle="BLÅ BASE" url={state.cameraBlueUrl} /></Panel>
      <Panel title="BANEKORT" className="map-panel"><div className="map-placeholder">{state.mapUrl ? <img src={state.mapUrl} alt="Banekort" /> : <><b>TACTICAL MAP</b><span>Upload/indsæt link til banekort i admin</span></>}</div></Panel>
      <Panel title="MISSION LOG" className="log-panel"><EventFeed events={state.events} /></Panel>
      <Panel title="LIVE CAMERA - OVERBLIK" className="camera-panel"><CameraFrame title="Overblik" subtitle="BANEN OVENFRA" url={state.cameraOverviewUrl} /></Panel>
    </div>
  </Layout>;
}
