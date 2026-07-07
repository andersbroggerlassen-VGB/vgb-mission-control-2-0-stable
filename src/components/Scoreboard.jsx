import TimerText from './TimerText.jsx';

export default function Scoreboard({ state, big = false }) {
  const redWins = Number(state.redScore) > Number(state.blueScore);
  const blueWins = Number(state.blueScore) > Number(state.redScore);
  return <div className={big ? 'scoreboard big' : 'scoreboard'}>
    <div className={`score-team red ${redWins ? 'leading' : ''}`}>
      <span>{state.redTeam}</span><strong>{state.redScore}</strong>
    </div>
    <div className="versus">VS</div>
    <div className={`score-team blue ${blueWins ? 'leading' : ''}`}>
      <span>{state.blueTeam}</span><strong>{state.blueScore}</strong>
    </div>
       <div className="timebox">
      <small>KAMPTID</small>
      <b><TimerText state={state} /></b>

      <div
  style={{
    width: '520px',
    maxWidth: '70%',
    height: '14px',
    margin: '12px auto 0',
    border: '1px solid rgba(86,255,24,.8)',
    background: '#071107',
    overflow: 'hidden',
    boxShadow: '0 0 18px rgba(86,255,24,.35)'
  }}
>
<div
  style={{
    height: '100%',
    width: `${state.duration ? (((state.remaining ?? state.duration) / state.duration) * 100) : 100}%`,
    background:
      ((state.remaining ?? state.duration) / state.duration) <= 0.25
        ? 'linear-gradient(90deg,#ff2b2b,#ff6a00)'
        : ((state.remaining ?? state.duration) / state.duration) <= 0.5
          ? 'linear-gradient(90deg,#ffd400,#ff9d00)'
          : 'linear-gradient(90deg,#56ff18,#a7d400)',
    boxShadow: '0 0 18px rgba(86,255,24,.8)',
    transition: 'width 1s linear'
  }}
/>

      <em className={`status-badge ${String(state.displayStatus).toLowerCase()}`}>{state.displayStatus}</em>
    </div>
  </div>;
}
