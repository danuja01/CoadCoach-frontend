import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TestCase } from "@/components";
import { Header } from "@/components";
import AddIcon from "@mui/icons-material/AddCircle";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Switch } from "@mui/material";
import module from "../../public/assets/quillTextModules";

const CreateQuestion = () => {
  const [testCases, setTestCases] = useState([<TestCase key={0} />]);
  const [quill, setQuill] = useState(null);

  const addTestCase = () => {
    setTestCases([...testCases, {}]);
  };

  const removeTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  const handleDiscard = () => {
    if (quill) {
      quill.getEditor().setText("");
    }
  };

  const renderedTestCases = testCases.map((_, index) => (
    <TestCase key={index} onRemove={() => removeTestCase(index)} />
  ));

  return (
    <>
      <Header />
      <h2 className="font-inter text-[28px] mb-5 font-bold mt-4 ml-5">Create Question</h2>
      <div className="flex flex-col justify-center items-center h-screen w-[800px] mx-auto">
        <form className="h-full">
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="name">
              Name:{" "}
            </label>
            <input className="border rounded-lg p-1 shadow-lg h-[40px] bg-[#EFEFEF]" name="name" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="description">
              Description:{" "}
            </label>
            <ReactQuill
              theme="snow"
              modules={module}
              className="border rounded-lg p-1 shadow-lg bg-[#EFEFEF] w-[912px]"
              ref={(el) => setQuill(el)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="share">
              Share with other labs?
            </label>
            <Switch size="medium" className="mb-1 ml-3" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-md text-[#4C5871]" htmlFor="description">
              Test Cases:
            </label>
            {renderedTestCases}
          </div>
          <div className=" flex flex-col mb-4">
            <Button
              variant="contained"
              onClick={addTestCase}
              startIcon={<AddIcon />}
              className="bg-[#4C5871] rounded-lg"
            >
              Add Test case
            </Button>
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

export default CreateQuestion;
