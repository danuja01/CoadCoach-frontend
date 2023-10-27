import { createApi } from "@reduxjs/toolkit/query/react";
import { createSelector } from "@reduxjs/toolkit";
import baseQuery, { mutationHelper } from "./base";

const { post } = mutationHelper;

export const submissionApi = createApi({
  reducerPath: "submissionApi",
  baseQuery,
  endpoints: (builder) => ({
    getSubmissions: builder.query({
      query: ({ filters, sorts, page }) => `/api/submissions?${filters}&${sorts}&page=${page}&limit=10`
    }),
    getSubmissionById: builder.query({
      query: (id) => `/api/submissions/${id}`
    }),
    addSubmission: builder.mutation({
      query: (data) => post(`/api/submissions`, data)
    }),
    getSubmissionsByUser: builder.mutation({
      query: (id) => `/api/submissions/one?userId=${id}`
    })
  })
});

export const selectSubmissionById = (id) =>
  createSelector(
    ({ submissionApi }) => submissionApi.queries,
    (queries) =>
      Object.values(queries)
        .filter((q) => q.endpointName === "getSubmissions")
        ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
        ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]
  );

export const {
  useGetSubmissionsQuery,
  useLazyGetSubmissionsQuery,
  useGetSubmissionByIdQuery,
  useLazyGetSubmissionByIdQuery,
  useAddSubmissionMutation,
  useGetSubmissionsByUserMutation
} = submissionApi;
