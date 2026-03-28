import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MissionForm from "../components/MissionForm";
import { addMission } from "../features/missions/missionsSlice";

function AddMission() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.missionsState);

  const handleAddMission = async (missionData) => {
    try {
      const createdMission = await dispatch(addMission(missionData)).unwrap();
      navigate(`/missions/${createdMission.id}`);
    } catch (error) {
      return;
    }
  };

  return (
    <section className="page-section">
      <MissionForm
        heading="Submit a New Mission"
        introText="Create a new mission for the Zing Wing dashboard. Keep it clear, realistic, and rewarding."
        submitLabel="Create Mission"
        onSubmit={handleAddMission}
        loading={loading}
        serverError={error}
      />
    </section>
  );
}

export default AddMission;
