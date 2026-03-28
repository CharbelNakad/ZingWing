import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedMission,
  fetchMissionById,
  removeMission,
} from "../features/missions/missionsSlice";

function DeleteMission() {
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

  const handleDelete = async () => {
    try {
      await dispatch(removeMission(id)).unwrap();
      navigate("/missions");
    } catch (error) {
      return;
    }
  };

  return (
    <section className="page-section delete-page">
      <div className="page-top">
        <span className="pill pill-secondary">Delete Mission</span>
        <h1 className="section-heading">Remove a mission from the Zing Wing board.</h1>
      </div>

      {loading && !selectedMission ? <p className="loading-text">Loading mission...</p> : null}
      {error && !selectedMission ? <p className="error-text">{error}</p> : null}

      {!loading && !error && selectedMission && (
        <article className="delete-card panel">
          <h2>Are you sure you want to delete this mission?</h2>
          <p>
            This action will remove <strong>{selectedMission.title}</strong> from the in-memory
            mission list.
          </p>

          <div className="delete-preview">
            <p>
              <span className="label-text">Difficulty</span>
              <strong>{selectedMission.difficulty}</strong>
            </p>
            <p>
              <span className="label-text">XP Reward</span>
              <strong>{selectedMission.xpReward}</strong>
            </p>
            <p>
              <span className="label-text">Goal Area</span>
              <strong>{selectedMission.meta.goalArea}</strong>
            </p>
          </div>

          <div className="cta-row">
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Confirm Delete
            </button>
            <Link to={`/missions/${selectedMission.id}`} className="btn btn-secondary">
              Cancel
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

export default DeleteMission;
