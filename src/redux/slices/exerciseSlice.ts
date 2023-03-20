import { createSlice } from "@reduxjs/toolkit";

export interface chosedExercises {
  name: string;
  type: string;
  weight: number;
  reps: number;
  id: number;
}
interface ExerciseState {
  choosenGroup: string;
  muscleGroup: string[];
  doneGroup: string[];
  chosedExercises: chosedExercises[];
  doneExercises: chosedExercises[];
}

const initialState: ExerciseState = {
  choosenGroup: "",
  muscleGroup: [],
  doneGroup: [],
  chosedExercises: [],
  doneExercises: [],
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setMuscleGroup: (state, action) => {
      state.muscleGroup.push(action.payload);
    },
    removeMuscleGroup: (state, action) => {
      state.muscleGroup = state.muscleGroup.filter(
        (muscleGroup) => muscleGroup !== action.payload
      );
    },
    setChoosenGroup: (state, action) => {
      state.choosenGroup = action.payload;
    },
    removeChoosenGroup: (state) => {
      state.choosenGroup = "";
    },
    clearMuscleGroup: (state) => {
      state.muscleGroup = [];
      state.choosenGroup = "";
    },
    setDoneGroup: (state, action) => {
      state.doneGroup.push(action.payload);
    },
    removeDoneGroup: (state, action) => {
      state.doneGroup = state.doneGroup.filter(
        (doneGroup) => doneGroup !== action.payload
      );
    },
    setChoosedExecises: (state, action) => {
      state.chosedExercises.push(action.payload);
    },
    removeChoosedExecises: (state, action) => {
      state.chosedExercises = state.chosedExercises.filter(chosedExercises => chosedExercises.name !== action.payload)
    },
    clearChoosedExercises: (state) => {
      state.chosedExercises = []
    },
    setDoneExercises: (state, action) => {
      state.doneExercises.push(action.payload);
    },
    removeDoneExercises: (state, action) => {
      state.doneExercises = state.doneExercises.filter(
        (doneExercises) =>
          doneExercises.name !== action.payload.name ||
          doneExercises.reps !== action.payload.reps ||
          doneExercises.weight !== action.payload.weight ||
          doneExercises.id !== action.payload.id
      );
    },
    clearDoneExercises: (state, action) => {
      state.doneExercises = state.doneExercises.filter(doneExercises => doneExercises.name !== action.payload)
    }
  },
});

export const {
  setMuscleGroup,
  removeMuscleGroup,
  setChoosenGroup,
  clearMuscleGroup,
  removeChoosenGroup,
  setDoneGroup,
  removeDoneGroup,
  setChoosedExecises,
  setDoneExercises,
  removeDoneExercises,
  removeChoosedExecises,
  clearChoosedExercises,
  clearDoneExercises,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
