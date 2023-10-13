import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { chatApi } from "./api/chat";
import { questionApi } from "./api/question";
import { submissionApi } from "./api/submission";
import sidePanelReducer from "./sidePanel";

export function makeStore() {
  return configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: combineReducers({
      sidePanel: sidePanelReducer,
      [authApi.reducerPath]: authApi.reducer,
      [questionApi.reducerPath]: questionApi.reducer,
      [chatApi.reducerPath]: chatApi.reducer,
      [submissionApi.reducerPath]: submissionApi.reducer
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
        .concat(authApi.middleware)
        .concat(questionApi.middleware)
        .concat(chatApi.middleware)
        .concat(submissionApi.middleware)
  });
}

export const store = makeStore();

export default { store };
