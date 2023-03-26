import { createSlice } from "@reduxjs/toolkit";
interface Date {
  date: string;
}
const initialState: Date = {
  date: '',
};
const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, action) {
        state.date = action.payload
    },
  },
});

export const {setDate} = dateSlice.actions;
export default dateSlice.reducer;