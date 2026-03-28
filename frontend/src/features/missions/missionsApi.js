const API_URL = "http://localhost:5000/missions";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.message || "Something went wrong.";
    const extraDetails = data.errors ? ` ${data.errors.join(" ")}` : "";
    throw new Error(`${errorMessage}${extraDetails}`.trim());
  }

  return data;
};

export const getAllMissions = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response);
};

export const getMissionById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
};

export const createMission = async (missionData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(missionData),
  });

  return handleResponse(response);
};

export const updateMission = async (id, missionData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(missionData),
  });

  return handleResponse(response);
};

export const deleteMission = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};
