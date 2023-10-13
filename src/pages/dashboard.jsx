import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Header } from "@/components";
import { StudentLabCard } from "@/components";
import { Box, Button } from "@mui/material";

//import { Box } from "@mui/material";

const Dashboard = () => {
  const [labs, setLabs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);

  const [mode, setMode] = useState("lab");

  const handleClick = (labId) => {
    setSelectedLab(labId);
    setMode("question");
  };

  const handleBack = () => {
    setSelectedLab(null);
    setMode("lab");
  };

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

  const chooseMode = () => {
    switch (mode) {
      case "lab":
        return labs.map((lab) => (
          <StudentLabCard key={lab._id} {...lab} mode={mode} handleClick={() => handleClick(lab._id)} />
        ));

      case "question":
        // eslint-disable-next-line no-case-declarations
        const selectedLabData = labs.find((lab) => lab._id === selectedLab);
        return (
          selectedLabData.codeChallenges &&
          selectedLabData.codeChallenges.map((codeChallenge, index) => (
            <Box key={index} className="relative p-5 py-12 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <div>
                <Link to={`/question/${codeChallenge._id}`}>
                  <h5 className="text-[28px] font-semibold">
                    {(codeChallenge.description.slice(0, 38) + "...").replace(/<[^>]*>?/gm, "")}
                  </h5>
                </Link>
              </div>
            </Box>
          ))
        );
    }
  };
  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <div className="flex justify-between items-center">
          <h2 className="font-inter text-[28px] mb-5 font-bold">Your Labs</h2>
          <Button onClick={handleBack} variant="contained" className="bg-[#4C5871] rounded-lg">
            back
          </Button>
        </div>
        <br />
        <div className="grid grid-cols-3 gap-5">{chooseMode()}</div>
      </div>
    </>
  );
};

export default Dashboard;
