import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { brand, coadcoach, copyright } from "@/constants";
import { store } from "@/store";
import { authApi, useLoginMutation } from "@/store/api/auth";
import { Button, Card, TextField } from "@mui/material";

// Import useLocation from react-router-dom

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login({
      email: e.target.email.value,
      password: e.target.password.value
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        store.dispatch(authApi.util.upsertQueryData("authUser", undefined, { data: res.data.user }));
        navigate("/question");
      });
  };

  return (
    <>
      <div className="grid grid-cols-2 w-screen h-screen">
        <div className="bg-gradient-to-r from-slate-500 to-slate-700 p-6">
          <h1 className="font-codeSans text-[50px] text-white">{brand.name}</h1>
          <div className="flex flex-col h-[calc(100%-50px)] ml-20 gap-6 justify-center">
            <p className="text-white text-[32px] ">
              <span className="text-blue-300">const</span> user = {role ? role.toUpperCase() : "programmer"};
            </p>
            <p className="text-white  text-[32px]">
              <span className="text-blue-300">function</span> signup(user){" { "} <br />
              &nbsp;&nbsp;<span className="text-gray-400">return</span> user; <br />
              {"} "}
            </p>
            <p className="text-white text-[32px] ">signup(user);</p>
          </div>
        </div>
        <form className="bg-[#E9ECF0] flex justify-center items-center" onSubmit={handleLogin}>
          <Card className="p-10 rounded-sm shadow-none">
            <div className="mb-8">
              <h3 className="text-[25px] font-inter font-semibold">Welcome Back!</h3>
              <p className="text-gray-400 text-sm">Please Sign in to continue Exploring CodeCoach_ </p>
            </div>
            <div className="flex flex-col gap-4">
              <TextField id="outlined-basic" label="username / email" name="email" variant="outlined" />
              <TextField id="outlined-basic" label="Password" name="password" variant="outlined" />
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300 mr-4"></div> {/* Horizontal line */}
                <a href="#" className="text-sm text-gray-400 hover:text-blue-600">
                  Forget Password?
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <Button
                className={`bg-primary text-white font-inter font-bold text-[18px] ${isLoading ? "opacity-50" : ""}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
              <p className="text-sm text-gray-400">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-600">
                  Sign up.
                </a>
              </p>
            </div>
          </Card>
        </form>
      </div>
      <div className="login-footer">
        <img
          src={`./assets/images/${role}.png`}
          alt="Landing"
          className="w-[70px] absolute bottom-5 left-5 opacity-40"
        />
        <p className="text-gray-300 absolute bottom-5 left-1/2 transform translate-x-3/4">
          {coadcoach} | {copyright}
        </p>
      </div>
    </>
  );
};

export default Login;
