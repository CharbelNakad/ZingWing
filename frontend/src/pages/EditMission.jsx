import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MissionForm from "../components/MissionForm";
import {
  clearSelectedMission,
  editMission,
  fetchMissionById,
} from "../features/missions/missionsSlice";

function EditMission() {
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

  const handleEditMission = async (missionData) => {
    try {
      await dispatch(editMission({ id, missionData })).unwrap();
      navigate(`/missions/${id}`);
    } catch (error) {
      return;
    }
  };

  return (
    <section className="page-section">
      {loading && !selectedMission ? (
        <p className="loading-text">Loading mission for editing...</p>
      ) : error && !selectedMission ? (
        <p className="error-text">{error}</p>
      ) : (
        <MissionForm
          heading="Update Existing Mission"
          introText="Refine the mission details, reward, and progress status, then save the updated version."
          submitLabel="Save Changes"
          initialValues={selectedMission}
          onSubmit={handleEditMission}
          loading={loading}
          serverError={error}
        />
      )}
    </section>
  );
}

export default EditMission;
