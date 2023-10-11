import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { Mutex } from "async-mutex";
import { authUser } from "@/utils";
import { mutationHelper } from "./mutation-helper";

export * from "./mutation-helper";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers) => {
    headers.set("authorization", `Bearer ${localStorage.getItem("access_token")}`);
    const user = authUser();
    if (user) {
      headers.set("x-user-email", user.email);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && result.error?.data?.message === "Token expired") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          mutationHelper.post("/api/auth/refresh", {
            refresh_token: localStorage.getItem("refresh_token")
          }),
          api,
          extraOptions
        );
        if (refreshResult.data) {
          localStorage.setItem("access_token", refreshResult.data.data?.access_token);
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.clear();
          window.location.pathname = "/login";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  if (result.error && result.error.data?.message !== "Unauthorized" && !extraOptions?.silent) {
    toast.error(result.error.data?.message ?? "just patching things up. This'll be over in a jiffy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  }
  return result;
};

export default baseQueryWithReauth;
