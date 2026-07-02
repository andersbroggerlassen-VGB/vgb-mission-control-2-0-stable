export default function EventFeed({ events = [] }) {
  const recent = [...events].slice(-5).reverse();
  return <div className="event-feed">
    {recent.length === 0 ? <div className="event empty">Mission log afventer hændelser</div> : recent.map((event, i) => <div className="event" key={i}><span>{event.time}</span>{event.text}</div>)}
  </div>;
}
