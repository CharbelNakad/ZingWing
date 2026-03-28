const express = require("express");
const {
  getAllMissions,
  getMission,
  createMission,
  updateMissionById,
  deleteMissionById,
} = require("../controllers/missionsController");

const router = express.Router();

router.get("/", getAllMissions);
router.get("/:id", getMission);
router.post("/", createMission);
router.put("/:id", updateMissionById);
router.delete("/:id", deleteMissionById);

module.exports = router;
