function RankBadge({ rank }) {
  return (
    <section className="rank-badge panel">
      <span className="label-text">Current Rank</span>
      <h2>{rank}</h2>
      <p>Your streak is building a stronger profile every day.</p>
    </section>
  );
}

export default RankBadge;
