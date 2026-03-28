import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MissionCard from "../components/MissionCard";
import { fetchMissions } from "../features/missions/missionsSlice";

function MissionsList() {
  const dispatch = useDispatch();
  const { missions, loading, error } = useSelector((state) => state.missionsState);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.meta.goalArea.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" || mission.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <section className="page-section missions-page">
      <div className="page-top">
        <span className="pill pill-glow">Mission Center</span>
        <h1 className="section-heading">Browse every mission in your Zing Wing queue.</h1>
        <p className="section-copy">
          Review all available missions, check their rewards, and jump into details, updates, or
          delete actions from one place.
        </p>
      </div>

      <div className="mission-toolbar panel">
        <label className="toolbar-field">
          <span>Search missions</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, description, or goal area"
          />
        </label>

        <label className="toolbar-field">
          <span>Filter by difficulty</span>
          <select
            value={difficultyFilter}
            onChange={(event) => setDifficultyFilter(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>

        <div className="mission-count">
          <span className="label-text">Showing</span>
          <strong>{filteredMissions.length} Missions</strong>
        </div>
      </div>

      {loading && <p className="loading-text">Loading missions...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && filteredMissions.length === 0 ? (
        <p className="empty-state">No missions matched your search. Try a different keyword.</p>
      ) : null}

      {!loading && !error && filteredMissions.length > 0 ? (
        <div className="mission-grid">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default MissionsList;
