import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exercise from "./slices/exerciseSlice";
import data from "./slices/dataSlice";
import user from "./slices/userSlice";
import side from "./slices/sideSlice";
import dateSlice from "./slices/dateSLice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const date = new Date();
const persistConfig = {
  key: "gym-bro",
  storage,
};
const rootReducer = combineReducers({
  exercise,
  data,
  user,
  side,
  dateSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
