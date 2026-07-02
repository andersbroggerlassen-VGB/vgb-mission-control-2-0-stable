.tactical-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 230px 1fr 260px;
  gap: 12px;
  padding: 12px;
  height: calc(100vh - 124px);
  overflow: hidden;
}

.tactical-score {
  grid-column: 1 / 3;
}

.tactical-map {
  grid-column: 1 / 3;
}

.tactical-view .panel {
  min-height: 0;
  height: 100%;
  padding: 14px;
}

.tactical-view .panel h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.tactical-view .scoreboard.big {
  min-height: 0;
  height: 170px;
  transform: none;
}

.tactical-view .scoreboard.big .score-team {
  min-height: 110px;
  padding: 10px;
}

.tactical-view .scoreboard.big .score-team strong {
  font-size: 72px;
}

.tactical-view .scoreboard.big .timebox {
  padding: 8px;
}

.tactical-view .scoreboard.big .timebox b {
  font-size: 58px;
}

.tactical-view .versus {
  padding: 12px 0;
  font-size: 26px;
}

.tactical-view .camera-body {
  height: calc(100% - 48px);
}

.tactical-view .map-placeholder {
  height: calc(100% - 42px);
  min-height: 0;
}

@media (max-width: 900px) {
  .tactical-view {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }

  .tactical-score,
  .tactical-map {
    grid-column: auto;
  }
}