import { Header } from "@/components";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";

const instructorDashboard = () => {
  return (
    <>
      <Header />
      <div className="mx-5 mt-10">
        <div className="grid grid-cols-3 gap-5">
          <a href="/createLab">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Create New Lab</h3>
            </Box>
          </a>
          <a href="/create-question">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Create Questions</h3>
            </Box>
          </a>
          <a href="/insSelect-lab">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Manage Labs</h3>
            </Box>
          </a>
        </div>
        <Divider className="mt-10 mb-10" />
        <h2 className="font-inter text-[28px] mb-5 font-bold">Your Labs</h2>
        <div className="grid grid-cols-3 gap-5">
          <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
            <h3 className="text-[28px] font-semibold">Name : OOP</h3>
            <p className="text-primary">Batch Group : Y2S1.WD.IT.01.03</p>
          </Box>
          <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
            <h3 className="text-[28px] font-semibold">Name : OOP</h3>
            <p className="text-primary">Batch Group : Y3S1.WD.SE.01.01</p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default instructorDashboard;
