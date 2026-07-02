import { formatTime } from '../lib/time.js';
export default function TimerText({ state }) { return formatTime(state.remaining); }
