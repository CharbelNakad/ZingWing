const {
  getMissions,
  getMissionById,
  getNextId,
  addMission,
  updateMission,
  deleteMission,
} = require("../data/missions");

const validateMissionPayload = (payload) => {
  const errors = [];

  if (!payload.title || typeof payload.title !== "string") {
    errors.push("Title is required.");
  }

  if (!payload.description || typeof payload.description !== "string") {
    errors.push("Description is required.");
  }

  if (!payload.difficulty || typeof payload.difficulty !== "string") {
    errors.push("Difficulty is required.");
  }

  if (typeof payload.xpReward !== "number" || Number.isNaN(payload.xpReward)) {
    errors.push("XP reward must be a valid number.");
  } else if (payload.xpReward < 0) {
    errors.push("XP reward cannot be negative.");
  }

  if (typeof payload.completed !== "boolean") {
    errors.push("Completed must be true or false.");
  }

  if (!Array.isArray(payload.tags)) {
    errors.push("Tags must be an array of strings.");
  }

  if (
    !payload.meta ||
    typeof payload.meta !== "object" ||
    !payload.meta.goalArea ||
    typeof payload.meta.goalArea !== "string"
  ) {
    errors.push("Goal area is required.");
  }

  return errors;
};

const parseMissionId = (idValue) => {
  const id = Number(idValue);

  if (Number.isNaN(id) || !Number.isInteger(id)) {
    return null;
  }

  return id;
};

const getAllMissions = (req, res) => {
  res.status(200).json(getMissions());
};

const getMission = (req, res) => {
  const id = parseMissionId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: "Mission id must be a number." });
  }

  const mission = getMissionById(id);

  if (!mission) {
    return res.status(404).json({ message: "Mission not found." });
  }

  return res.status(200).json(mission);
};

const createMission = (req, res) => {
  const errors = validateMissionPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Mission validation failed.",
      errors,
    });
  }

  const newMission = {
    id: getNextId(),
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    difficulty: req.body.difficulty.trim(),
    xpReward: req.body.xpReward,
    completed: req.body.completed,
    tags: req.body.tags,
    meta: {
      goalArea: req.body.meta.goalArea.trim(),
    },
  };

  addMission(newMission);
  return res.status(201).json(newMission);
};

const updateMissionById = (req, res) => {
  const id = parseMissionId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: "Mission id must be a number." });
  }

  const existingMission = getMissionById(id);

  if (!existingMission) {
    return res.status(404).json({ message: "Mission not found." });
  }

  const errors = validateMissionPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Mission validation failed.",
      errors,
    });
  }

  const updatedMission = {
    id,
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    difficulty: req.body.difficulty.trim(),
    xpReward: req.body.xpReward,
    completed: req.body.completed,
    tags: req.body.tags,
    meta: {
      goalArea: req.body.meta.goalArea.trim(),
    },
  };

  updateMission(id, updatedMission);
  return res.status(200).json(updatedMission);
};

const deleteMissionById = (req, res) => {
  const id = parseMissionId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: "Mission id must be a number." });
  }

  const deletedMission = deleteMission(id);

  if (!deletedMission) {
    return res.status(404).json({ message: "Mission not found." });
  }

  return res.status(200).json({
    message: "Mission deleted successfully.",
    mission: deletedMission,
  });
};

module.exports = {
  getAllMissions,
  getMission,
  createMission,
  updateMissionById,
  deleteMissionById,
};
