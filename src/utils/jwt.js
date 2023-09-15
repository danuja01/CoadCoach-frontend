import jwt_decode from "jwt-decode";

export const authUser = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return jwt_decode(token)?.data;
  }
  return null;
};
