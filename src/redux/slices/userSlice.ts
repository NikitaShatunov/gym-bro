import { createSlice } from "@reduxjs/toolkit";
interface User {
  mail: null | string,
  name: string,
  id: null | number,
  gender: null | number,
  age: null | number,
}
const initialState: User = {
  mail: null,
  name: '',
  id: null,
  gender: null,
  age: null,
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
      state.name = '';
      state.id = null;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
  },
});

export const {setUser, removeUser, setName, setGender, setAge} = userSlice.actions;
export default userSlice.reducer;