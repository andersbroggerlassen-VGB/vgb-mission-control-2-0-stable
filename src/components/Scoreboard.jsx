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
      <em className={`status-badge ${String(state.displayStatus).toLowerCase()}`}>{state.displayStatus}</em>
    </div>
  </div>;
}
