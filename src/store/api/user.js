import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { patch } = mutationHelper;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, data }) => patch(`/api/users/${id}`, data)
    }),
    changePassword: builder.mutation({
      query: (data) => patch(`/api/users/change_password`, data)
    })
  })
});

export const { useUpdateProfileMutation, useChangePasswordMutation } = userApi;
