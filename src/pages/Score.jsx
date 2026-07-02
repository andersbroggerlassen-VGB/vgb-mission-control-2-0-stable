import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';
import Scoreboard from '../components/Scoreboard.jsx';
import EventFeed from '../components/EventFeed.jsx';

export default function Score({ state }) {
  return <Layout title="LIVE SCOREBOARD">
    <div className="score-page-grid">
      <Panel title="SCOREBOARD" className="single score-master"><Scoreboard state={state} big /></Panel>
      <Panel title="MISSION LOG" className="score-log"><EventFeed events={state.events} /></Panel>
    </div>
  </Layout>;
}
