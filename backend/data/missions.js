let missions = [
  {
    id: 1,
    title: "Wake up at 8:00 AM",
    description: "Sleep before midnight and wake up at 8 AM to start the day strong.",
    difficulty: "Beginner",
    xpReward: 20,
    completed: true,
    tags: ["sleep", "discipline"],
    meta: { goalArea: "Health" },
  },
  {
    id: 2,
    title: "Drink 2 liters of water",
    description: "Track your water intake and finish two liters before the day ends.",
    difficulty: "Beginner",
    xpReward: 15,
    completed: true,
    tags: ["health", "hydration"],
    meta: { goalArea: "Wellness" },
  },
  {
    id: 3,
    title: "Read 10 pages",
    description: "Read at least ten pages from a book or study material without distractions.",
    difficulty: "Intermediate",
    xpReward: 25,
    completed: false,
    tags: ["learning", "focus"],
    meta: { goalArea: "Growth" },
  },
  {
    id: 4,
    title: "30-minute workout",
    description: "Complete a half-hour workout that raises your energy and focus.",
    difficulty: "Intermediate",
    xpReward: 35,
    completed: false,
    tags: ["fitness", "energy"],
    meta: { goalArea: "Health" },
  },
  {
    id: 5,
    title: "15-minute meditation",
    description: "Spend fifteen minutes meditating to reset and reduce mental clutter.",
    difficulty: "Beginner",
    xpReward: 18,
    completed: true,
    tags: ["mindfulness", "calm"],
    meta: { goalArea: "Mental Health" },
  },
  {
    id: 6,
    title: "Plan tomorrow before bed",
    description: "Write a short plan for the next day with your top priorities.",
    difficulty: "Advanced",
    xpReward: 30,
    completed: false,
    tags: ["planning", "organization"],
    meta: { goalArea: "Productivity" },
  },
];

const getMissions = () => missions;

const getMissionById = (id) => missions.find((mission) => mission.id === id);

const getNextId = () => {
  if (missions.length === 0) {
    return 1;
  }

  return Math.max(...missions.map((mission) => mission.id)) + 1;
};

const addMission = (mission) => {
  missions.push(mission);
  return mission;
};

const updateMission = (id, updatedMission) => {
  const missionIndex = missions.findIndex((mission) => mission.id === id);

  if (missionIndex === -1) {
    return null;
  }

  missions[missionIndex] = updatedMission;
  return missions[missionIndex];
};

const deleteMission = (id) => {
  const missionIndex = missions.findIndex((mission) => mission.id === id);

  if (missionIndex === -1) {
    return null;
  }

  const deletedMission = missions[missionIndex];
  missions = missions.filter((mission) => mission.id !== id);
  return deletedMission;
};

module.exports = {
  getMissions,
  getMissionById,
  getNextId,
  addMission,
  updateMission,
  deleteMission,
};
