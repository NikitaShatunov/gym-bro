import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async (muscleGroup: string) => {
  const { data } = await axios.get(`https://63f333adde3a0b242b3cfd4b.mockapi.io/exercises/choosenExercises?muscle_group=${muscleGroup}`)
  return data;
});
type Exercise = string;
type MuscleGroup = string;
type ExerciseData = {
  muscle_group: MuscleGroup;
  exercises: Exercise[];
};

interface DataState {
    data: ExerciseData[][];
    loading: boolean;
    error: null | string;
}
const initialState: DataState = {
    data: [],
    loading: false,
    error: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItems(state, action) {
      state.data.push(action.payload);
  },
  resetItems(state) {
    state.data = []
},
 removeItems(state, action) {
  state.data[0].filter(obj => obj.exercises !== action.payload)
 }
},
  
extraReducers: (builder) => {
    builder
    .addCase(fetchData.pending, (state: DataState) => {
    state.loading = true;
    })
    .addCase(fetchData.fulfilled, (state: DataState, action) => {
    state.data.push(action.payload);
    state.loading = false;
    state.error = null;
    })
    .addCase(fetchData.rejected, (state: DataState, action) => {
    state.loading = false;
    state.error = action.error.message || 'Error fetching data';
    });
    },
});

export const { setItems, resetItems, removeItems } = dataSlice.actions;
export default dataSlice.reducer;