import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editMission } from "../features/missions/missionsSlice";

function MissionCard({ mission }) {
  const dispatch = useDispatch();
  const difficultyClass = mission.difficulty.toLowerCase();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completeError, setCompleteError] = useState("");

  const handleMarkCompleted = async () => {
    if (mission.completed || isCompleting) {
      return;
    }

    setIsCompleting(true);
    setCompleteError("");

    try {
      await dispatch(
        editMission({
          id: mission.id,
          missionData: {
            title: mission.title,
            description: mission.description,
            difficulty: mission.difficulty,
            xpReward: mission.xpReward,
            completed: true,
            tags: mission.tags,
            meta: {
              goalArea: mission.meta.goalArea,
            },
          },
        })
      ).unwrap();
    } catch (error) {
      setCompleteError(error || "Could not update mission status.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <article className="mission-card panel">
      <div className="mission-card-top">
        <span className={`difficulty-badge ${difficultyClass}`}>{mission.difficulty}</span>
        {mission.completed ? (
          <span className="status-badge completed">Completed</span>
        ) : (
          <button
            type="button"
            className="status-badge pending status-button"
            onClick={handleMarkCompleted}
            disabled={isCompleting}
          >
            {isCompleting ? "Marking..." : "Pending"}
          </button>
        )}
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

      {completeError ? <p className="error-text">{completeError}</p> : null}

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
