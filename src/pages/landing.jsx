import { brand, coadcoach, copyright, role } from "@/constants";
import Button from "@mui/material/Button";

const Landing = () => {
  return (
    <section id="brand-hero" className="bg-gradient-to-r from-slate-500 to-slate-700 h-screen w-screen px-20 relative">
      <div className="flex flex-col items-center py-12">
        <h1 className="text-[64px] text-white pb-4">
          Welcome to <span className="font-codeSans">{brand.name}</span>
        </h1>
        <p className="text-[28px] text-gray-400 font-inter font-medium">{brand.caption}</p>
      </div>
      <section id="brand-body" className="grid grid-cols-2 my-6">
        <div className="py-10 flex flex-col gap-6 border-r">
          <h2 className="font-codeSans font-medium text-[25px] text-white">
            <span className="text-blue-300">CONST</span> I AM =
          </h2>
          <Button className="font-codeSans bg-[#E9ECF0] text-black text-[35px] py-4 w-[calc(100%-150px)] hover:opacity-75">
            <img src="./assets/images/programmer.png" alt="Programmer" className="w-20 h-20 mr-8" />
            {role.programmer.toUpperCase()};
          </Button>
          <Button className="font-codeSans bg-[#E9ECF0] text-black text-[35px] px-10 py-4 w-[calc(100%-150px)] hover:opacity-75">
            <img src="./assets/images/tutor.png" alt="Instructor" className="w-20 h-20 mr-8" />
            {role.instructor.toUpperCase()};
          </Button>
        </div>
        <div className="pl-16 py-10 flex flex-col justify-center">
          <h2 className="text-white font-inter text-[20px] font-semibold">
            Introducing {brand.name.replace("_", "")}:
          </h2>
          <p className="font-codeSans text-white text-[18px] my-5 leading-8">
            CodeCoach is your one-stop solution for both novice programmers and instructors. It offers interactive
            learning, <span className="text-blue-500">AI-powered</span> assistance, extensive resources, and instructor
            tools. Designed for beginners and lifelong learners, CodeCoach empowers you to master coding.
          </p>
        </div>
      </section>
      <section id="brand-footer">
        <img src="./assets/images/landing-image.png" alt="Landing" className="w-[400px] absolute bottom-0 right-0" />
        <p className="text-white absolute bottom-10">
          {coadcoach} | {copyright}
        </p>
      </section>
    </section>
  );
};

export default Landing;
