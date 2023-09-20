import { Header } from "@/components";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <h2 className="font-inter text-[28px] mb-5 font-bold">Your Labs</h2>
        <div className="grid grid-cols-3 gap-5">
          <Box
            className="p-5 py-16 hover:opacity-75 cursor-pointer"
            style={{ backgroundColor: "rgba(100, 116, 139, 0.55)" }}
          >
            <h3 className="text-[28px] font-semibold">NAME : OOP</h3>
            <p className="text-primary">INSTRUCTOR: Saman Disanayake</p>
          </Box>
          <Box
            className="p-5 py-16 hover:opacity-75 cursor-pointer"
            style={{ backgroundColor: "rgba(100, 116, 139, 0.55)" }}
          >
            <h3 className="text-[28px] font-semibold">NAME : OOP</h3>
            <p className="text-primary">INSTRUCTOR: Saman Disanayake</p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
