import Layout from '../components/Layout.jsx';
import Panel from '../components/Panel.jsx';
import CameraFrame from '../components/CameraFrame.jsx';

const names = {
  red: 'GRØN BASE',
  blue: 'BLÅ BASE',
  overview: 'BANEN OVENFRA'
};

const titles = {
  red: 'LIVE CAMERA - GRØN',
  blue: 'LIVE CAMERA - BLÅ',
  overview: 'LIVE CAMERA - OVERBLIK'
};

export default function CameraPage({ state, camera }) {
  const url =
    camera === 'red'
      ? state.cameraRedUrl
      : camera === 'blue'
        ? state.cameraBlueUrl
        : state.cameraOverviewUrl;

  return (
    <Layout title={titles[camera]}>
      <Panel
        title={titles[camera]}
        className="single camera-screen"
      >
        <CameraFrame
          title={titles[camera]}
          subtitle={names[camera]}
          url={url}
        />
      </Panel>
    </Layout>
  );
}