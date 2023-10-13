import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Header } from "@/components";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack } from "@mui/material";

const CreateLab = () => {
  const [moduleName, setModuleName] = useState("");
  const [batchGroup, setBatchGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    console.error("Access token is not available in local storage");
    return <div>Error: Access token not available. Please log in to get the token.</div>;
  }

  const handleDiscard = () => {
    setModuleName("");
    setBatchGroup("");
  };

  const batchGroupOptions = ["Y1S1.G1", "Y1S1.G2", "Y1S2.G1", "Y1S2.G2", "Y2S1.G1", "Y2S1.G2", "Y2S2.G1", "Y2S2.G2"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const newLab = {
      moduleName,
      batchGroup
    };

    const apiUrl = "http://localhost:3000/api/labs";

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };

      const response = await axios.post(apiUrl, newLab, { headers });

      console.log("Lab created successfully:", response.data);
      setModuleName("");
      setBatchGroup("");

      window.alert("Lab created successfully.");

      window.location.href = "/insSelect-lab";
    } catch (error) {
      console.error("Error creating lab:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <h2 className="font-inter text-[28px] mb-5 font-bold mt-4 ml-5">Create Lab</h2>
      <div className="flex flex-col justify-center items-center h-screen w-[800px] mx-auto">
        <form onSubmit={handleSubmit} className="h-full">
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="name">
              Module Name:{" "}
            </label>
            <input
              className="border rounded-lg p-1 shadow-lg h-[40px] bg-[#EFEFEF]"
              name="moduleName"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="batchGroup">
              Batch Group:{" "}
            </label>
            <select
              className="border rounded-lg p-1 shadow-lg h-[40px] bg-[#EFEFEF]"
              name="batchGroup"
              value={batchGroup}
              onChange={(e) => setBatchGroup(e.target.value)}
            >
              <option value="">Select Batch Group</option>
              {batchGroupOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col mb-4 mx-auto">
            <Stack direction="row" spacing={5} className=" px-80">
              <Button
                type="submit"
                variant="contained"
                className="bg-[#4C5871] rounded-lg"
                startIcon={<CreateIcon />}
                //disabled={isSubmitting}
              >
                Create
              </Button>
              <Button
                type="reset"
                variant="contained"
                className=" bg-[#4C5871] rounded-lg"
                startIcon={<DeleteIcon />}
                onClick={handleDiscard}
                //disabled={isSubmitting}
              >
                Discard
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateLab;
