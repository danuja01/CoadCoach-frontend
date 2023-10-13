import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Header } from "@/components";
import { LabCard } from "@/components";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";

// const labs = [
//   {
//     _id: "1",
//     name: "OOP",
//     batchGroup: "Lorem ipsum dolor sit amet"
//   },
//   {
//     _id: "2",
//     name: "ISDM",
//     batchGroup: "Lorem ipsum dolor sit amet"
//   },
//   {
//     _id: "3",
//     name: "SE",
//     batchGroup: "Lorem ipsum dolor sit amet"
//   },
//   {
//     _id: "4",
//     name: "CN",
//     batchGroup: "Lorem ipsum dolor sit amet"
//   }
// ];

const SelectLab = () => {
  const [labs, setLabs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Access token is not available in local storage");
      return <div>Error: Access token not available. Please log in to get the token.</div>;
    }

    const apiUrl = "http://localhost:3000/api/labs";

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

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Labs Report", 10, 10);

    let y = 30;

    const moduleNameX = 10;
    const batchGroupX = 80;

    doc.text("Module Name", moduleNameX, y);
    doc.text("Batch Group", batchGroupX, y);

    y += 10;

    labs.forEach((lab) => {
      doc.text(lab.moduleName, moduleNameX, y);
      doc.text(lab.batchGroup, batchGroupX, y);
      y += 10;
    });

    doc.save("labs_report.pdf");
  };

  async function handleDeleteLab(labId) {
    const confirmation = window.confirm("Are you sure you want to delete this lab?");

    if (confirmation) {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("Access token is not available in local storage");
          return <div>Error: Access token not available. Please log in to get the token.</div>;
        }

        const apiUrl = "http://localhost:3000/api/labs";

        const headers = {
          Authorization: `Bearer ${accessToken}`
        };
        await axios.delete(`${apiUrl}/${labId}`, { headers });

        window.alert("Lab deleted successfully.");

        setLabs();
      } catch (error) {
        console.error("Error deleting the lab:", error);
        window.alert("Error deleting the lab.");
      }
    }
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <div className="grid grid-cols-4 gap-5">
          <a href="/createLab">
            <Box className="p-5 py-12 hover:opacity-75 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
              <h3 className="text-[28px] font-semibold text-center self-center">Create New Lab</h3>
            </Box>
          </a>
        </div>
        <Divider className="mt-10 mb-10" />
        <h2 className="font-inter text-[28px] mb-5 font-bold">Manage Your Labs</h2>
        <br />
        <button
          onClick={generatePDFReport}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate PDF Report
        </button>
        <br />
        <br />
        <div className="grid grid-cols-3 gap-5">
          {labs.map((lab) => (
            <LabCard
              key={lab._id}
              //onEdit={() => handleEditLab(lab._id)}
              onDelete={() => handleDeleteLab(lab._id)}
              {...lab}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectLab;
