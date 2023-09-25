import { brand, coadcoach, copyright, role } from "@/constants";
import { Button, Card, TextField } from "@mui/material";

const Register = () => {
  return (
    <>
      <div className="grid grid-cols-2 w-screen h-screen">
        <div className="bg-gradient-to-r from-slate-500 to-slate-700 p-6">
          <h1 className="font-codeSans text-[50px] text-white">{brand.name}</h1>
          <div className="flex flex-col h-[calc(100%-50px)] ml-20 gap-6 justify-center">
            <p className="text-white text-[32px] ">
              <span className="text-blue-300">const</span> user = {role.programmer.toUpperCase()};
            </p>
            <p className="text-white  text-[32px]">
              <span className="text-blue-300">function</span> register(user){" { "} <br />
              &nbsp;&nbsp;<span className="text-gray-400">return</span> user; <br />
              {"} "}
            </p>
            <p className="text-white text-[32px] ">register(user);</p>
          </div>
        </div>
        <div className="bg-[#E9ECF0] flex justify-center items-center">
          <Card className="p-10 rounded-sm shadow-none">
            <div className="mb-8">
              <h3 className="text-[25px] font-inter font-semibold">Let&apos;s Get Started!!</h3>
              <p className="text-gray-400 text-sm">Please Sign Up to Explore {brand.name} </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <TextField id="outlined-basic" label="First Name" variant="outlined" />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" />
              </div>
              <TextField id="outlined-basic" label="Username" variant="outlined" />
              <TextField id="outlined-basic" label="University" variant="outlined" />
              <TextField id="outlined-basic" type="email" label="E-mail" variant="outlined" />
              <TextField id="outlined-basic" type="password" label="Password" variant="outlined" />
              <TextField id="outlined-basic" type="password" label="Re: Password" variant="outlined" />
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <Button className="bg-primary text-white font-inter font-bold text-[18px]">Sign In</Button>
              <p className="text-sm text-gray-400">
                Already have an account?&nbsp;
                <a href="#" className="text-blue-600">
                  Sign in.
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="login-footer">
        <img
          src={`./assets/images/programmer.png`}
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

export default Register;
