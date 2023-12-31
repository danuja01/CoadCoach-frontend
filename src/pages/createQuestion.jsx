import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { TestCase } from "@/components";
import { Header } from "@/components";
import module from "@/utils/quillTextModules";
import AddIcon from "@mui/icons-material/AddCircle";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Switch } from "@mui/material";

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
    <TestCase id={index} key={index} onRemove={() => removeTestCase(index)} />
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const challengeData = {
      name: event.target.name.value,
      description: quill.getEditor().getText(),
      isPublic: event.target.share.checked,
      publisher: "64da6dc95c92bdeb4de3a5ca",
      testCases: testCases.map((testCase, index) => ({
        testName: event.target[`testName${index}`].value,
        description: event.target[`description${index}`].value,
        input: event.target[`input${index}`].value,
        output: event.target[`output${index}`].value
      }))
    };

    console.log(challengeData);

    try {
      const response = await axios.post("http://localhost:3000/api/challenges/", challengeData);
      console.log("Challenge created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating challenge: ", error);
    }
  };

  return (
    <>
      <Header />
      <h2 className="font-inter text-[28px] mb-5 font-bold mt-4 ml-5">Create Question</h2>
      <div className="flex flex-col justify-center items-center h-screen w-[800px] mx-auto">
        <form className="h-full" onSubmit={handleSubmit}>
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
            <Switch size="medium" className="mb-1 ml-3" name="share" />
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
