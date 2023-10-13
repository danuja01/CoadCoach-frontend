import { useState } from "react";
import CloseIcon from "@mui/icons-material/close";
import { IconButton, TextareaAutosize } from "@mui/material";

const UpdateTestCase = ({ onRemove, id, testCase }) => {
  const [testName, setTestName] = useState(testCase.testName || ""); // Initialize with testCase value
  const [description, setDescription] = useState(testCase.description || "");
  const [input, setInput] = useState(testCase.input || "");
  const [output, setOutput] = useState(testCase.output || "");

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutput(e.target.value);
  };

  return (
    <>
      <div className="bg-[#EFEFEF] rounded-lg shadow-lg p-8 m-4 h-fit">
        <div className="relative p-3">
          <IconButton className="absolute top-0 right-0" aria-label="remove" onClick={onRemove}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-md text-[#4C5871]"> Test Name: </label>
          <input
            className="border rounded-lg h-[40px] p-1 bg-[#DADADA]"
            name={`testName${id}`}
            type="text"
            value={testName}
            onChange={handleTestNameChange}
          ></input>
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-md text-[#4C5871]"> Description:</label>
          <TextareaAutosize
            minRows={5}
            className="border rounded-lg p-1 bg-[#DADADA]"
            name={`description${id}`}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-md text-[#4C5871]"> Input: </label>
          <TextareaAutosize
            minRows={3}
            className="border rounded-lg p-1 bg-[#DADADA]"
            name={`input${id}`}
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-md text-[#4C5871]"> Output: </label>
          <TextareaAutosize
            minRows={3}
            className="border rounded-lg p-1 bg-[#DADADA]"
            name={`output${id}`}
            value={output}
            onChange={handleOutputChange}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateTestCase;
