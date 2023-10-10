export const mutationHelper = {
  post: (url, body = {}) => ({
    url,
    method: "POST",
    body
  }),
  put: (url, body) => ({
    url,
    method: "PUT",
    body
  }),
  patch: (url, body) => ({
    url,
    method: "PATCH",
    body
  })
};
