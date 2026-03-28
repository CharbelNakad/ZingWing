import { Link } from "react-router-dom";

function MissionCard({ mission }) {
  const difficultyClass = mission.difficulty.toLowerCase();

  return (
    <article className="mission-card panel">
      <div className="mission-card-top">
        <span className={`difficulty-badge ${difficultyClass}`}>{mission.difficulty}</span>
        <span className={`status-badge ${mission.completed ? "completed" : "pending"}`}>
          {mission.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <h3>{mission.title}</h3>
      <p>{mission.description}</p>

      <div className="mission-stats">
        <div>
          <span className="label-text">XP</span>
          <strong>{mission.xpReward}</strong>
        </div>
        <div>
          <span className="label-text">Goal Area</span>
          <strong>{mission.meta.goalArea}</strong>
        </div>
      </div>

      <div className="tag-list">
        {mission.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            #{tag}
          </span>
        ))}
      </div>

      <div className="card-actions">
        <Link to={`/missions/${mission.id}`} className="btn btn-secondary">
          Details
        </Link>
        <Link to={`/missions/${mission.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
        <Link to={`/missions/${mission.id}/delete`} className="btn btn-secondary">
          Delete
        </Link>
      </div>
    </article>
  );
}

export default MissionCard;
