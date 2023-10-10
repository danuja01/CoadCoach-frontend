import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { post } = mutationHelper;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => post(`/api/auth/login`, data),
      transformResponse: (response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return response;
      }
    }),
    register: builder.mutation({
      query: (data) => post(`/api/auth/register`, data)
    }),
    requestPasswordResetCode: builder.mutation({
      query: (data) => post(`/api/auth/forgot_password`, data)
    }),
    resetPassword: builder.mutation({
      query: ({ code, data }) => post(`/api/auth/reset_password/${code}`, data)
    }),
    authUser: builder.query({
      query: () => `/api/auth/current`,
      extraOptions: {
        silent: true
      }
    }),
    logout: builder.mutation({
      query: () => post(`/api/auth/logout`)
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRequestPasswordResetCodeMutation,
  useResetPasswordMutation,
  useAuthUserQuery,
  useLogoutMutation
} = authApi;
