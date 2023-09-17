import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <Editor
      width={`100%`}
      language={language || "javascript"}
      value={value}
      theme={theme}
      defaultValue={"// Start typing your code here..."}
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
