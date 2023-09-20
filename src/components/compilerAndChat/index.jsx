import { useState } from "react";
import { useEffect } from "react";
import { Split } from "@geoffcox/react-splitter";
import { useSelector } from "react-redux";
import axios from "axios";
import { languageOptions } from "@/constants/languageOptions";
import { defineTheme } from "@/lib/defineTheme";
import { Button } from "@mui/material";
import { AiChat } from "..";
import CodeEditorWindow from "./compiler/codeEditor";
import LanguageDropdown from "./compiler/languageDropdown";
import OutputPane from "./compiler/outputPane";
import ThemeDropdown from "./compiler/themeDropdown";
import QuestionPane from "./questionPane";

const CompilerAndChat = () => {
  const [theme, setTheme] = useState({ value: "night-owl", label: "Night Owl" });
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");
  const [outputResult, setOutputResult] = useState(null);

  const { option } = useSelector((state) => state.sidePanel);

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

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
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

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
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

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputResult(response.data);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };

  useEffect(() => {
    defineTheme("night-owl").then(() => setTheme({ value: "night-owl", label: "Night Owl" }));
  }, []);

  const showComponent = () => {
    switch (option) {
      case "ai-chat":
        return <AiChat />;
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
              <Button onClick={handleCompile} className="text-black font-bold px-8 py-3 hover:border">
                {processing ? "PROCESSING..." : "RUN CODE"}
              </Button>
              <Button className="bg-primary text-white font-semibold px-8 py-2">SUBMIT</Button>
            </div>
            {/* horizontal line */}
            <div className="h- w-full">
              {outputResult && (
                <>
                  <div className="border-b border-gray-300 my-2"></div>
                  <OutputPane outputResult={outputResult} />
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
        <QuestionPane />
      </div>
      <div className="w-full h-full overflow-y-auto">{showComponent()}</div>
    </Split>
  );
};

export default CompilerAndChat;
