import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';
import { formatTime } from '../lib/time.js';

export default function Briefing({ state }) {
  return <Layout title="MISSION BRIEFING">
    <Panel title="MISSION BRIEFING" className="briefing-screen">
      <div className="briefing-hero">
        <div className="briefing-icon">⚑</div>
        <div><h1>{state.missionName}</h1><h3>{state.missionType}</h3></div>
      </div>
      <div className="briefing-body">
        <section><h4>PRIMÆRT MÅL</h4><p>{state.missionText}</p></section>
        <section><h4>REGLER</h4><div className="rule-cards large">{state.rules.map((rule, i) => <span key={i}>{rule}</span>)}</div></section>
        <section><h4>MISSIONSTID</h4><div className="brief-time">{formatTime(state.duration)}</div></section>
        <section><h4>BESKED</h4><p className="message-text">{state.message}</p></section>
      </div>
    </Panel>
  </Layout>;
}
