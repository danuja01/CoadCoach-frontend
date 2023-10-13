import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authUser } from "@/utils";

export const whitelistedPaths = ["", "login", "forgot-password", "reset-password"];

const useAuth = (users = ["ADMIN"]) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (
      (!localStorage.getItem("access_token") && !whitelistedPaths.includes(location.pathname.split("/")[1])) ||
      (localStorage.getItem("access_token") && !users.includes(authUser()?.role))
    ) {
      navigate("/");
      console.log("Unauthorized access, redirecting to login page");
    }
    setCompleted(true);
  }, [location]);

  return completed;
};

export default useAuth;
