import { configureStore } from "@reduxjs/toolkit";
import sidePanelReducer from "./sidePanel";

export function makeStore() {
  return configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
      sidePanel: sidePanelReducer
    }
  });
}

export const store = makeStore();

export default { store };
