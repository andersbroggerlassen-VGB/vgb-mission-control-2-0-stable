import { useEffect, useState } from 'react';

export default function CameraFrame({ title, subtitle, url }) {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = clock.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="camera-frame-hud">
      <div className="camera-hud-top">
        <span className="rec-dot"></span>
        <strong>REC</strong>
        <span>LIVE</span>
        <em>{time}</em>
      </div>

      <div className="camera-hud-label">
        <strong>{title || 'CAMERA'}</strong>
        <span>{subtitle || 'TACTICAL FEED'}</span>
      </div>

      <div className="camera-body">
        {url ? (
       <iframe
  src={url}
  title={title}
  allow="autoplay; fullscreen"
  allowFullScreen
  scrolling="no"
  style={{
    width: "100%",
    height: "100%",
    border: "0",
    display: "block"
  }}
/>
        ) : (
          <div className="no-signal">
            <span>NO SIGNAL</span>
            <small>AWAITING LIVE FEED</small>
          </div>
        )}
      </div>

      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
    </div>
  );
}