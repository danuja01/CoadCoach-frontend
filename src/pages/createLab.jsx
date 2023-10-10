import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Header } from "@/components";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack } from "@mui/material";

const CreateLab = () => {
  const [batchGroup, setBatchGroup] = useState("");

  const handleDiscard = () => {
    if (batchGroup) {
      batchGroup.getEditor().setText("");
    }
  };

  const batchGroupOptions = ["Y1S1.G1", "Y1S1.G2", "Y1S2.G1", "Y1S2.G2", "Y2S1.G1"];

  return (
    <>
      <Header />
      <h2 className="font-inter text-[28px] mb-5 font-bold mt-4 ml-5">Create Lab</h2>
      <div className="flex flex-col justify-center items-center h-screen w-[800px] mx-auto">
        <form className="h-full">
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="name">
              Module Name:{" "}
            </label>
            <input className="border rounded-lg p-1 shadow-lg h-[40px] bg-[#EFEFEF]" name="name" />
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
              <Button type="submit" variant="contained" className=" bg-[#4C5871] rounded-lg" startIcon={<CreateIcon />}>
                Create
              </Button>
              <Button
                type="reset"
                variant="contained"
                className=" bg-[#4C5871] rounded-lg"
                startIcon={<DeleteIcon />}
                onClick={handleDiscard}
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
