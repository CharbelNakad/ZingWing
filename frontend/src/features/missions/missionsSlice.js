import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
} from "./missionsApi";

export const fetchMissions = createAsyncThunk(
  "missions/fetchMissions",
  async (_, thunkAPI) => {
    try {
      return await getAllMissions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMissionById = createAsyncThunk(
  "missions/fetchMissionById",
  async (id, thunkAPI) => {
    try {
      return await getMissionById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addMission = createAsyncThunk(
  "missions/addMission",
  async (missionData, thunkAPI) => {
    try {
      return await createMission(missionData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editMission = createAsyncThunk(
  "missions/editMission",
  async ({ id, missionData }, thunkAPI) => {
    try {
      return await updateMission(id, missionData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeMission = createAsyncThunk(
  "missions/removeMission",
  async (id, thunkAPI) => {
    try {
      await deleteMission(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const missionsSlice = createSlice({
  name: "missions",
  initialState: {
    missions: [],
    selectedMission: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMission: (state) => {
      state.selectedMission = null;
    },
    clearMissionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMission = action.payload;
      })
      .addCase(fetchMissionById.rejected, (state, action) => {
        state.loading = false;
        state.selectedMission = null;
        state.error = action.payload;
      })
      .addCase(addMission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMission.fulfilled, (state, action) => {
        state.loading = false;
        state.missions.push(action.payload);
      })
      .addCase(addMission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editMission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMission.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMission = action.payload;
        state.missions = state.missions.map((mission) =>
          mission.id === action.payload.id ? action.payload : mission
        );
      })
      .addCase(editMission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeMission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMission.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMission = null;
        state.missions = state.missions.filter(
          (mission) => mission.id !== Number(action.payload)
        );
      })
      .addCase(removeMission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMission, clearMissionError } = missionsSlice.actions;
export default missionsSlice.reducer;
