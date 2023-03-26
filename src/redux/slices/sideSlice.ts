import { createSlice } from "@reduxjs/toolkit";
interface User {
  goal: number;
  drunk: number;
}
const initialState: User = {
  goal: 0,
  drunk: 0,
};
const sideSlice = createSlice({
  name: "side",
  initialState,
  reducers: {
    setGoal(state, action) {
        state.goal = action.payload
    },
    setDrunk(state, action) {
        state.drunk += action.payload
    },
    clearWaterState(state) {
        state.drunk = 0
        state.goal = 0
    },
  },
});

export const {setDrunk, setGoal, clearWaterState} = sideSlice.actions;
export default sideSlice.reducer;