import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { post } = mutationHelper;

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery,
  endpoints: (builder) => ({
    sendChat: builder.mutation({
      query: (data) => post(`/api/chat`, data)
    })
  })
});

export const { useSendChatMutation } = chatApi;
