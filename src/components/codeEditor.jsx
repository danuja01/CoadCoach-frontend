import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const defaultValue = `/**
   * CoadeCoach code editor
   * Choose a language and start coding.
   * Happy coding :)
   */
  `;

  return (
    <Editor
      width={`100%`}
      language={language || "javascript"}
      value={value}
      theme={theme}
      defaultValue={defaultValue}
      onChange={handleEditorChange}
      options={{
        fontSize: 14,
        minimap: {
          enabled: true
        }
      }}
    />
  );
};
export default CodeEditorWindow;
