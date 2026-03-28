function LeaderboardPreview({ friends }) {
  return (
    <section className="leaderboard panel">
      <div className="card-heading-row">
        <div>
          <span className="pill pill-secondary">Leaderboard</span>
          <h2>Friend Energy</h2>
        </div>
      </div>

      <div className="leaderboard-list">
        {friends.map((friend, index) => (
          <div className="leaderboard-item" key={friend.name}>
            <div className="leaderboard-left">
              <span className="leaderboard-position">#{index + 1}</span>
              <div>
                <strong>{friend.name}</strong>
                <p>{friend.rank}</p>
              </div>
            </div>
            <strong>{friend.xp} XP</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LeaderboardPreview;
