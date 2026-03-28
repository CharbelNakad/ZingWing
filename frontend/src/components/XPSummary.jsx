function XPSummary({ totalXP, currentLevel, nextLevelXP, progressPercent }) {
  return (
    <section className="xp-summary panel">
      <div className="xp-summary-header">
        <div>
          <span className="pill pill-glow">XP Summary</span>
          <h2>Total Momentum</h2>
        </div>
        <strong className="xp-total">{totalXP} XP</strong>
      </div>

      <div className="xp-level-row">
        <div>
          <span className="label-text">Current Level</span>
          <h3>Level {currentLevel}</h3>
        </div>
        <div>
          <span className="label-text">Next Goal</span>
          <h3>{nextLevelXP} XP</h3>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="progress-caption">Keep stacking completed missions to power up your rank.</p>
    </section>
  );
}

export default XPSummary;
