import { combineReducers, configureStore } from '@reduxjs/toolkit';
import exercise from './slices/exerciseSlice';
import data from './slices/dataSlice';

const rootReducer = combineReducers({
  exercise,
  data,
})

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;