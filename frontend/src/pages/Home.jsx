import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import XPSummary from "../components/XPSummary";
import RankBadge from "../components/RankBadge";
import LeaderboardPreview from "../components/LeaderboardPreview";
import AvatarPreview from "../components/AvatarPreview";
import { fetchMissions } from "../features/missions/missionsSlice";

const getRank = (xp) => {
  if (xp >= 200) {
    return "Legendary";
  }
  if (xp >= 100) {
    return "Elite";
  }
  if (xp >= 50) {
    return "Rising";
  }
  return "Rookie";
};

function Home() {
  const dispatch = useDispatch();
  const { missions, loading, error } = useSelector((state) => state.missionsState);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const totalXP = missions
    .filter((mission) => mission.completed)
    .reduce((sum, mission) => sum + mission.xpReward, 0);

  const currentLevel = Math.floor(totalXP / 50) + 1;
  const rank = getRank(totalXP);
  const levelStart = (currentLevel - 1) * 50;
  const nextLevelXP = currentLevel * 50;
  const progressPercent = Math.min(((totalXP - levelStart) / 50) * 100, 100);

  const aiSuggestions = [
    "Pair your reading mission with a no-phone timer for a cleaner focus streak.",
    "Try finishing your planning mission right after dinner to lock in tomorrow's wins.",
    "A quick hydration mission can be your easiest XP boost before noon.",
  ];

  const leaderboardData = [
    { name: "Maroun", rank: "Legendary", xp: 248 },
    { name: "Kevin", rank: "Elite", xp: 176 },
    { name: "Chris", rank: "Rising", xp: 98 },
  ];

  return (
    <section className="page-section home-page">
      <div className="hero panel">
        <div className="hero-copy">
          <span className="pill pill-glow">Productivity Game On</span>
          <h1>Build better habits, earn XP, and rise through the Zing Wing ranks.</h1>
          <p>
            Zing Wing turns everyday productivity into an energy-filled mission dashboard. Finish
            small wins, stack XP, and stay motivated with rank progress, avatar growth, and friend
            momentum.
          </p>

          <div className="cta-row">
            <Link to="/missions" className="btn btn-primary">
              View Missions
            </Link>
            <Link to="/missions/new" className="btn btn-secondary">
              Add New Mission
            </Link>
          </div>
        </div>

        <div className="hero-highlight">
          <div className="hero-stat-card">
            <span className="label-text">Current Rank</span>
            <strong>{rank}</strong>
          </div>
          <div className="hero-stat-card">
            <span className="label-text">Completed XP</span>
            <strong>{totalXP} XP</strong>
          </div>
          <div className="hero-stat-card">
            <span className="label-text">Level</span>
            <strong>{currentLevel}</strong>
          </div>
        </div>
      </div>

      {loading && <p className="loading-text">Loading your mission dashboard...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="home-grid">
        <XPSummary
          totalXP={totalXP}
          currentLevel={currentLevel}
          nextLevelXP={nextLevelXP}
          progressPercent={progressPercent}
        />
        <RankBadge rank={rank} />
        <AvatarPreview currentLevel={currentLevel} rank={rank} />
        <section className="suggestions panel">
          <div className="card-heading-row">
            <div>
              <span className="pill pill-secondary">AI Suggestions</span>
              <h2>Today's Smart Boosters</h2>
            </div>
          </div>
          <div className="suggestion-list">
            {aiSuggestions.map((suggestion) => (
              <div className="suggestion-item" key={suggestion}>
                <span className="suggestion-icon">+</span>
                <p>{suggestion}</p>
              </div>
            ))}
          </div>
        </section>
        <LeaderboardPreview friends={leaderboardData} />
      </div>
    </section>
  );
}

export default Home;
