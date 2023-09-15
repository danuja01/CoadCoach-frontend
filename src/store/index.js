import { combineReducers, configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    devTools: import.meta.env.VITE_APP_ENV !== "production",
    reducer: combineReducers({})
  });
}

export const store = makeStore();

export default { store };
