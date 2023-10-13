import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components";
import { StudentLabCard } from "@/components";

//import { Box } from "@mui/material";

const Dashboard = () => {
  const [labs, setLabs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Access token is not available in local storage");
      return <div>Error: Access token not available. Please log in to get the token.</div>;
    }

    const apiUrl = "http://localhost:3000/api/labs/all";

    async function getLabs() {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`
        };
        const response = await axios.get(apiUrl, { headers });
        setLabs(response.data.data);
      } catch (err) {
        console.error("Error fetching labs:", err);
        setError(err);
      }
    }
    getLabs();
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <h2 className="font-inter text-[28px] mb-5 font-bold">Your Labs</h2>
        <br />
        <div className="grid grid-cols-3 gap-5">
          {labs.map((lab) => (
            <StudentLabCard key={lab._id} {...lab} />
          ))}
        </div>

        {/* <div className="grid grid-cols-3 gap-5">
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
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
