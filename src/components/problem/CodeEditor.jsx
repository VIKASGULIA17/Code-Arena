import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_VERSIONS } from "../../data/constants";
import TestCases from "./TestCases";
import {
  getProblemTemplate,
  problemTemplates,
} from "../../data/problemTemplates";
import { driverCode_Template } from "../../data/driverCodeTemplate";

const CodeEditor = ({ problemId }) => {
  const LanguageList = Object.entries(LANGUAGE_VERSIONS);   //all the language and versions
  const [Language, setLanguage] = useState(LanguageList[0]);  // current slected language 
  const CodeEditorRef = useRef(); //refrence ot code editor
  const [Output, setOutput] = useState(null); // output (here because if i want to reset the code ,testcases get reset too)
  
  const onMount = (editor) => { //to focus on editor on refresh
    CodeEditorRef.current = editor;
    editor.focus();
  };

  const template = driverCode_Template[1]['python']['boilerplate'];

  // const fetchedTemplate = getProblemTemplate(problemId, Language[0]);  //basic teplate 
  const [Code, setCode] = useState(template); //current code of the user

  useEffect(() => {
    if (CodeEditorRef.current) {
      CodeEditorRef.current.setValue(Code);
    }
  }, [Language]); 

  const handleReset = () => {
    const freshTemplate = driverCode_Template[problemId]?.[Language[0]]?.boilerplate || "";
    
    // 2. Update state
    setCode(freshTemplate);
    setOutput(null);
    if (CodeEditorRef.current) {
      CodeEditorRef.current.setValue(freshTemplate);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <LanguageSelector
        LanguageList={LanguageList}
        Language={Language}
        setLanguage={setLanguage}
        setCode={setCode}
        onReset={handleReset}
        problemId={problemId}
        Output={Output}
        setOutput={setOutput}
      />
      <div className="h-[92.2vh] overflow-scroll select-text ">
        <Editor
          height="50vh"
          language={Language[0]}
          
          defaultValue={template} 
          
          theme="vs-light"
          onMount={onMount}
          
          onChange={(value) => {
            setCode(value);
          }}
          
          options={{
            fontSize: 16,
            lineHeight: 24,
            padding: { top: 10, bottom: 10 },
            minimap: { enabled: false },
            letterSpacing: 1,
            selectOnLineNumbers: true,
            scrollbar: false,
          }}
        />

        <TestCases 
            Language={Language} 
            value={Code} 
            problemId={problemId} 
            Output={Output}
            setOutput={setOutput}
        />
      </div>
    </div>
  );
};

export default CodeEditor;