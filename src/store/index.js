import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import sidePanelReducer from "./sidePanel";

export function makeStore() {
  return configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: combineReducers({
      sidePanel: sidePanelReducer,
      [authApi.reducerPath]: authApi.reducer
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(authApi.middleware)
  });
}

export const store = makeStore();

export default { store };
