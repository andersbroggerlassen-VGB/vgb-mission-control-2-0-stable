export default function CameraFrame({ title, subtitle, url }) {
  return <div className="camera-frame">
    <div className="camera-head"><span>{subtitle}</span><strong><i /> LIVE</strong></div>
    <div className="camera-body">
      {url ? <iframe title={title} src={url} allow="autoplay; fullscreen" /> : <div className="no-signal"><span>NO SIGNAL</span><small>Indsæt stream-link i admin</small></div>}
    </div>
  </div>;
}
