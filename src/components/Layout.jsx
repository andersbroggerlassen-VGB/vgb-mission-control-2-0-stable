import { useEffect, useState } from 'react';
import { Link } from './Link.jsx';
import logo from '../assets/vgb-logo.png';

export default function Layout({ children, title = 'MISSION CONTROL', compact = false }) {
  const [clock, setClock] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time =
  clock.toLocaleDateString('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) +
  ' • ' +
  clock.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return <main className={compact ? 'app compact' : 'app'}>
    <div className="background-system"><div className="radar-sweep" /></div>
    <header className="topbar topbar-v2">
      <div className="brand brand-v2"><img src={logo} alt="Vejle Gel Blaster" /><div><strong>VEJLE GEL BLASTER</strong><span>{title.replace('SYSTEM','').trim()}</span></div></div>
      <div className="top-status"><span className="status-dot" /> ONLINE <b>{time}</b></div>
      <nav className="nav-v2">
        <Link href="/admin">Admin</Link><Link href="/briefing">Briefing</Link><Link href="/score">Score</Link><Link href="/map">Kort</Link><Link href="/camera-red">Rød cam</Link><Link href="/camera-blue">Blå cam</Link><Link href="/camera-overview">Overblik</Link>
      </nav>
    </header>
    {children}
  </main>;
import { useEffect, useState } from 'react';
import { Link } from './Link.jsx';
import logo from '../assets/vgb-logo.png';

export default function Layout({ children, title = 'MISSION CONTROL', compact = false }) {
  const [clock, setClock] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time =
  clock.toLocaleDateString('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) +
  ' • ' +
  clock.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return <main className={compact ? 'app compact' : 'app'}>
    <div className="background-system"><div className="radar-sweep" /></div>
    <header className="topbar topbar-v2">
      <div className="brand brand-v2"><img src={logo} alt="Vejle Gel Blaster" /><div><strong>VEJLE GEL BLASTER</strong><span>{title.replace('SYSTEM','').trim()}</span></div></div>
      <div className="top-status"><span className="status-dot" /> ONLINE <b>{time}</b></div>
      <nav className="nav-v2">
        <Link href="/admin">Admin</Link><Link href="/briefing">Briefing</Link><Link href="/score">Score</Link><Link href="/map">Kort</Link><Link href="/camera-red">Rød cam</Link><Link href="/camera-blue">Blå cam</Link><Link href="/camera-overview">Overblik</Link>
      </nav>
    </header>s
    {children}
  </main>;

}
