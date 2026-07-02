import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';

export default function MapPage({ state }) {
  return <Layout title="TACTICAL MAP">
    <Panel title="BANEKORT" className="single map-screen">
      <div className="map-placeholder full">{state.mapUrl ? <img src={state.mapUrl} alt="Banekort" /> : <><b>TACTICAL MAP OFFLINE</b><span>Indsæt billede/URL til banekort i admin</span><div className="grid-map"><i /><i /><i /><i /></div></>}</div>
    </Panel>
  </Layout>;
}
