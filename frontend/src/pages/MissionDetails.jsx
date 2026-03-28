import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedMission,
  fetchMissionById,
} from "../features/missions/missionsSlice";

function MissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedMission, loading, error } = useSelector((state) => state.missionsState);

  useEffect(() => {
    dispatch(fetchMissionById(id));

    return () => {
      dispatch(clearSelectedMission());
    };
  }, [dispatch, id]);

  return (
    <section className="page-section details-page">
      <div className="page-top">
        <span className="pill pill-secondary">Mission Details</span>
        <h1 className="section-heading">Explore one mission in full detail.</h1>
      </div>

      {loading && <p className="loading-text">Loading mission details...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && selectedMission && (
        <article className="mission-details-card panel">
          <div className="details-top">
            <div>
              <h2>{selectedMission.title}</h2>
              <p>{selectedMission.description}</p>
            </div>
            <span
              className={`status-badge ${selectedMission.completed ? "completed" : "pending"}`}
            >
              {selectedMission.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-box">
              <span className="label-text">Difficulty</span>
              <strong>{selectedMission.difficulty}</strong>
            </div>
            <div className="detail-box">
              <span className="label-text">XP Reward</span>
              <strong>{selectedMission.xpReward}</strong>
            </div>
            <div className="detail-box">
              <span className="label-text">Goal Area</span>
              <strong>{selectedMission.meta.goalArea}</strong>
            </div>
            <div className="detail-box">
              <span className="label-text">Mission ID</span>
              <strong>#{selectedMission.id}</strong>
            </div>
          </div>

          <div className="tag-list">
            {selectedMission.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                #{tag}
              </span>
            ))}
          </div>

          <div className="cta-row">
            <Link to={`/missions/${selectedMission.id}/edit`} className="btn btn-primary">
              Edit Mission
            </Link>
            <Link to={`/missions/${selectedMission.id}/delete`} className="btn btn-danger">
              Delete Mission
            </Link>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </article>
      )}
    </section>
  );
}

export default MissionDetails;
