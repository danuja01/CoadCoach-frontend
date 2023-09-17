import { useState } from "react";
import { useEffect } from "react";
import { CodeEditorWindow, Header, QuestionPane, SidePanel, ThemeDropdown } from "@/components";
import LanguageDropdown from "@/components/languageDropdown";
import { languageOptions } from "@/constants/languageOptions";
import { defineTheme } from "@/lib/defineTheme";
import Splitter from "@devbookhq/splitter";
import { Button } from "@mui/material";

const Question = () => {
  const [theme, setTheme] = useState({ value: "night-owl", label: "Night Owl" });
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");

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

  useEffect(() => {
    defineTheme("night-owl").then(() => setTheme({ value: "night-owl", label: "Night Owl" }));
  }, []);

  return (
    <div className="w-full">
      <Header />
      <div className="flex  h-[calc(100vh-117px)]">
        <SidePanel />

        <Splitter>
          <div className=" w-full h-full overflow-y-scroll">
            <QuestionPane />
          </div>
          <div className="mt-2 mx-2 h-ful flex flex-col gap-2">
            <div className="self-end flex gap-2">
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
              <LanguageDropdown onSelectChange={onLanguageChange} language={language} />
            </div>
            <div className="h-[calc(100vh-235px)]">
              <CodeEditorWindow theme={theme.value} language={language?.value} code={code} onChange={onCodeChange} />
            </div>
            <div className="self-end  space-x-2">
              <Button className="text-black font-bold px-8 py-3 hover:border">Run Code</Button>
              <Button className="bg-primary text-white font-semibold px-8 py-2">SUBMIT</Button>
            </div>
          </div>
        </Splitter>
      </div>
    </div>
  );
};

export default Question;
