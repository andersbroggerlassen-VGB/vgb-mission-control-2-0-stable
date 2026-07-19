import { useEffect, useRef, useState } from 'react';

export default function CameraFrame({ title, subtitle, url }) {
  const [clock, setClock] = useState(new Date());
  const frameRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = clock.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await frameRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Kunne ikke åbne fullscreen:', error);
    }
  };

  return (
    <div ref={frameRef} className="camera-frame-hud">
      <div className="camera-hud-top">
        <span className="rec-dot"></span>
        <strong>REC</strong>
        <span>LIVE</span>

        <button
          type="button"
          className="camera-fullscreen-button"
          onClick={toggleFullscreen}
        >
          FULD SKÆRM
        </button>

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
            allow="autoplay"
            scrolling="no"
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