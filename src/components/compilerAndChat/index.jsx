import { useState } from "react";
import { useEffect } from "react";
import { Split } from "@geoffcox/react-splitter";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { languageOptions } from "@/constants/languageOptions";
import { defineTheme } from "@/lib/defineTheme";
import { useAddSubmissionMutation } from "@/store/api/submission";
import { Button } from "@mui/material";
import { AiChat } from "..";
import CodeEditorWindow from "./compiler/codeEditor";
import LanguageDropdown from "./compiler/languageDropdown";
import OutputPane from "./compiler/outputPane";
import ThemeDropdown from "./compiler/themeDropdown";
import QuestionPane from "./questionPane";

const CompilerAndChat = ({ question, id }) => {
  const [theme, setTheme] = useState({ value: "night-owl", label: "Night Owl" });
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [messages, setMessages] = useState([{ text: "Hello, how can I assist you?", isUser: false, sender: "Coach" }]);
  const userId = localStorage.getItem("user_id");

  const { option } = useSelector((state) => state.sidePanel);
  const [addSubmission, { isLoading }] = useAddSubmissionMutation();

  const [processing, setProcessing] = useState(null);

  const handleThemeChange = (th) => {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then(() => setTheme(theme));
    }
  };

  const onCodeChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const onLanguageChange = (sl) => {
    setLanguage(sl);
  };

  const handleTestCases = async () => {
    setProcessing(true);
    setTestResults([]);

    for (let i = 0; i < question.testCases.length; i++) {
      const currentTestCase = question.testCases[i];
      const formData = {
        language_id: language.id,
        stdin: currentTestCase.input,
        source_code: btoa(code)
      };
      const options = {
        method: "POST",
        url: import.meta.env.VITE_RAPID_API_URL + "/submissions",
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY
        },
        data: formData
      };

      try {
        const response = await axios.request(options);
        const token = response.data.token;
        const result = await checkStatus(token, currentTestCase);
        console.log("result", result);
        setTestResults((prevResults) => [...prevResults, result]);
      } catch (err) {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error.source_code[0]);
        toast.error("source code " + error.source_code[0], {
          position: toast.POSITION.TOP_RIGHT
        });
        break; // Exit the loop on error
      }
    }

    setProcessing(false);
  };

  const checkStatus = async (token, currentTestCase) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY
      }
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // Still processing, wait for a moment and then check again
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return await checkStatus(token, currentTestCase);
      } else {
        const result = {
          id: currentTestCase._id,
          input: currentTestCase.input,
          output: response.data,
          expected_output: currentTestCase.output
        };
        return result;
      }
    } catch (err) {
      console.log("err", err);
      return null;
    }
  };

  const handleSubmit = async () => {
    // Define the submission body

    if (testResults.length !== question.testCases.length) {
      toast.error("Please run all test cases before submitting", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    let passCount = 0;

    //update pass count out of total testCases
    testResults.map((result) => {
      if (atob(result.output.stdout).trim() == result.expected_output) {
        passCount++;
      }
    });

    const submission = {
      userId: userId,
      questionId: id,
      code: code,
      language: language.label,
      score: ((passCount / question.testCases.length) * 100).toFixed(2),
      testCasesStatus: testResults.map((result) => ({
        testCaseId: result.id,
        status: atob(result.output.stdout).trim() == result.expected_output ? "Completed" : "Failed"
      }))
    };

    try {
      const response = await addSubmission(submission);
      // Handle the response as needed
      console.log("Submission response:", response);
      toast.success("Submission successful", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (err) {
      // Handle the error
      console.error("Submission error:", err);
    }
  };

  useEffect(() => {
    console.log("testResults", testResults);
  }, [testResults]);

  useEffect(() => {
    defineTheme("night-owl").then(() => setTheme({ value: "night-owl", label: "Night Owl" }));
  }, []);

  const showComponent = () => {
    switch (option) {
      case "ai-chat":
        return <AiChat questionId={id} code={code} messages={messages} setMessages={setMessages} />;
      default:
        return (
          <div className="mt-2 mx-2 flex flex-col gap-2">
            <div className="self-end flex gap-2">
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
              <LanguageDropdown onSelectChange={onLanguageChange} language={language} />
            </div>
            <div className="h-[calc(100vh-235px)]">
              <CodeEditorWindow theme={theme.value} language={language?.value} code={code} onChange={onCodeChange} />
            </div>
            <div className="self-end space-x-2">
              <Button onClick={handleTestCases} className="text-black font-bold px-8 py-3 hover:border">
                {processing ? "PROCESSING..." : "RUN CODE"}
              </Button>
              <Button onClick={handleSubmit} className="bg-primary text-white font-semibold px-8 py-2">
                {isLoading ? "SUBMITTING..." : "SUBMIT"}
              </Button>
            </div>
            {/* horizontal line */}
            <div className="h- w-full">
              {testResults.length > 0 && (
                <>
                  <div className="border-b border-gray-300 my-2"></div>
                  <OutputPane testResults={testResults} testCasesLength={question.testCases.length} />
                </>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <Split initialPrimarySize="45%" resetOnDoubleClick>
      <div className=" w-full h-full overflow-y-auto">
        <QuestionPane question={question} />
      </div>
      <div className="w-full h-full overflow-y-auto">{showComponent()}</div>
    </Split>
  );
};

export default CompilerAndChat;
