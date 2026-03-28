import { configureStore } from "@reduxjs/toolkit";
import missionsReducer from "../features/missions/missionsSlice";

export const store = configureStore({
  reducer: {
    missionsState: missionsReducer,
  },
});
