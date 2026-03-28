function AvatarPreview({ currentLevel, rank }) {
  return (
    <section className="avatar-preview panel">
      <div className="card-heading-row">
        <div>
          <span className="pill pill-glow">Avatar Progress</span>
          <h2>Zing Pilot</h2>
        </div>
      </div>

      <div className="avatar-card">
        <img src="/images/avatar-placeholder.svg" alt="Avatar placeholder" />
        <div>
          <h3>Level {currentLevel} Explorer</h3>
          <p>
            Current title: <strong>{rank}</strong>
          </p>
          <p>Each finished mission adds more XP and unlocks stronger status in the app.</p>
        </div>
      </div>
    </section>
  );
}

export default AvatarPreview;
