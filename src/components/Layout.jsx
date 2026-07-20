import { useEffect, useState } from 'react';
import { Link } from './Link.jsx';
import logo from '../assets/vgb-logo.png';
console.log(logo);

export default function Layout({ children, title = 'MISSION CONTROL', compact = false }) {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = clock.toLocaleTimeString('da-DK', {
  hour: '2-digit',
  minute: '2-digit'
});

  return (
    <main className={compact ? 'app compact' : 'app'}>
      <div className="background-system">
        <div className="radar-sweep" />
      </div>

      <header className="topbar topbar-v2">
        <div className="brand brand-v2">
        <img src={logo} alt="Vejle Gel Blaster" className="brand-logo" />
          <div>
  <strong>VEJLE GEL BLASTER</strong>
  <span>MISSION STATUS</span>
</div>
        </div>

        <div className="top-status">
          <span className="status-dot" />
          ONLINE <b>{time}</b>
        </div>

       <nav className="nav-v2">
  <Link href="/admin">Admin</Link>
  <Link href="/briefing">Briefing</Link>
  <Link href="/score">Score</Link>
  <Link href="/tactical">Tactical</Link>
  <Link href="/map">Kort</Link>
 <Link href="/camera-red">Grøn base</Link>
<Link href="/camera-blue">Blå base</Link>
  <Link href="/camera-overview">Overblik</Link>
</nav>
      </header>

      {children}
    </main>
  );
}