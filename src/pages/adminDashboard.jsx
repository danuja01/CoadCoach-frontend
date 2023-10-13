import { Header } from "@/components";
import { Box } from "@mui/material";

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <div className="mx-5 mt-10">
        <div className="grid grid-cols-2 gap-5">
          <a href="">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Lab Forums</h3>
            </Box>
          </a>
          <a href="">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Labs</h3>
            </Box>
          </a>
          <a href="">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Create Questions</h3>
            </Box>
          </a>
          <a href="">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Questions</h3>
            </Box>
          </a>
          <a href="">
            <Box className="p-5 py-16 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold">Submissions</h3>
            </Box>
          </a>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
