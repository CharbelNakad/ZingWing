function About() {
  return (
    <section className="page-section about-page">
      <div className="page-top">
        <span className="pill pill-secondary">About Zing Wing</span>
        <h1 className="section-heading">A startup-style productivity experience with game energy.</h1>
        <p className="section-copy">
          Zing Wing is designed as a future-focused productivity app concept that helps people stay
          consistent through missions, XP, ranks, and visual progress. It makes self-improvement
          feel rewarding, trackable, and more fun.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card panel">
          <h2>What Zing Wing Is</h2>
          <p>
            Zing Wing is a productivity companion where users create and complete missions based on
            healthy habits, planning, focus, and personal growth.
          </p>
        </article>

        <article className="about-card panel">
          <h2>How XP Works</h2>
          <p>
            Every mission awards XP. As users complete missions, they build momentum, level up, and
            unlock stronger rank identities that reflect their progress.
          </p>
        </article>

        <article className="about-card panel">
          <h2>Why Missions Matter</h2>
          <p>
            Missions turn big goals into manageable actions. A simple routine like hydrating,
            reading, or planning tomorrow becomes a measurable step forward.
          </p>
        </article>

        <article className="about-card panel">
          <h2>Motivation Through Ranking</h2>
          <p>
            Ranks, avatar progress, and leaderboard previews create motivation without needing real
            competition. The concept is about positive momentum and visible growth.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
