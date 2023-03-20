import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mail: null,
  name: null,
  id: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.mail = action.payload;
    },
    removeUser(state) {
      state.mail = null;
      state.name = null;
      state.id = null;
    },
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

export const {setUser, removeUser, setName} = userSlice.actions;
export default userSlice.reducer;