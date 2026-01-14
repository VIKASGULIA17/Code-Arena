import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_VERSIONS } from "../../data/constants";
import { CODE_SNIPPETS } from "../../data/constants";

const CodeEditor = () => {
  const LanguageList = Object.entries(LANGUAGE_VERSIONS);
  const [Language, setLanguage] = useState(LanguageList[0]);
  const CodeEditorRef = useRef();
  const onMount = (editor) => {
    CodeEditorRef.current = editor;
    editor.focus();
  };
  const [Code, setCode] = useState(CODE_SNIPPETS[Language[0]]);

  return (
    <div className="flex flex-col gap-3">
      <LanguageSelector
        LanguageList={LanguageList}
        Language={Language}
        setLanguage={setLanguage}
        setCode={setCode}
      />
      <Editor
        height="90vh"
        language={Language[0]}
        // defaultValue={CODE_SNIPPETS[Language[0]]}
        theme="vs-dark"
        onMount={onMount}
        value={Code}
        onChange={(e) => {
          setCode(e);
        }}
      />
    </div>
  );
};

export default CodeEditor;
