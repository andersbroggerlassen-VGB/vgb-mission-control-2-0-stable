import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';
import Scoreboard from '../components/Scoreboard.jsx';
import CameraFrame from '../components/CameraFrame.jsx';

export default function TacticalView({ state }) {
  return (
    <Layout title="TACTICAL VIEW">
      <div className="tactical-view">
        <Panel title="LIVE SCOREBOARD" className="tactical-score">
          <Scoreboard state={state} big />
        </Panel>

        <Panel title="RØD BASE CAMERA" className="tactical-camera">
          <CameraFrame title="Rød kamera" subtitle="RØD BASE" url={state.cameraRedUrl} />
        </Panel>

        <Panel title="BLÅ BASE CAMERA" className="tactical-camera">
          <CameraFrame title="Blå kamera" subtitle="BLÅ BASE" url={state.cameraBlueUrl} />
        </Panel>

        <Panel title="TACTICAL MAP" className="tactical-map">
          <div className="map-placeholder">
            {state.mapUrl ? (
              <img src={state.mapUrl} alt="Banekort" />
            ) : (
              <>
                <b>TACTICAL MAP</b>
                <span>Indsæt link til banekort i admin</span>
              </>
            )}
          </div>
        </Panel>
      </div>
    </Layout>
  );
}