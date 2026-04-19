import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_VERSIONS } from "../../data/constants";
import TestCases from "./TestCases";
import { userCode } from "../../data/UserCodeTemplate";
import { problemSolutions } from "../../data/solution";
import ResizablePanels from "../utils/ResizablePanel";

const CodeEditor = ({ problemId,codeTemplates,isContest,setcurrentTopBar,testcaseData,problemMeta }) => {

  const LanguageList = Object.entries(LANGUAGE_VERSIONS);   //all the language and versions
  const [Language, setLanguage] = useState(LanguageList[0]); 

// console.log("Available code templates for this problem:", codeTemplates);

  const CodeEditorRef = useRef(); //refrence ot code editor
  const [Output, setOutput] = useState(null); // output (here because if i want to reset the code ,testcases get reset too)

  const currentLang=Language[0];
  
  const onMount = (editor) => { //to focus on editor on refresh
    CodeEditorRef.current = editor;
    editor.focus();
  };


  const template = codeTemplates?.[currentLang] || " no template found";


  const [Code, setCode] = useState(template); //current code of the user 

  // useEffect(() => {
    
  //   const newLang=Language[0]
  //   // const new_template = userCode[problemId][newLang]['boilerplate'];
  //   // setCode(new_template)
  //   setOutput(null)

  //   if(CodeEditorRef.current){
  //     // CodeEditorRef.current.setValue(new_template);
  //   }
  
  // }, [problemId,Language])
  

  useEffect(() => {
    if (CodeEditorRef.current) {
      CodeEditorRef.current.setValue(Code);
    }
  }, [Language]); 

  const handleReset = () => {
    const freshTemplate = codeTemplates?.[currentLang] || " no template found"
    // 2. Update state
    setCode(freshTemplate);
    setOutput(null);
    if (CodeEditorRef.current) {
      CodeEditorRef.current.setValue(freshTemplate);
    }
  };

  return (
    <div className="flex flex-col h-full w-full gap-0">
      <LanguageSelector
        LanguageList={LanguageList}
        Language={Language}
        codeTemplates={codeTemplates}
        setLanguage={setLanguage}
        setCode={setCode}
        onReset={handleReset}
        // problemId={problemId}
        Output={Output}
        setOutput={setOutput}
      />
      <ResizablePanels direction="vertical" initialSize={60}>
        {/* Editor Panel */}
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Editor
            height="100%"
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
              scrollbar: { alwaysConsumeMouseWheel: false },
            }}
          />
        </div>

        {/* TestCases Panel */}
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TestCases 
            Language={Language} 
            value={Code} 
            problemId={problemId} 
            Output={Output}
            setOutput={setOutput}
            isContest={isContest}
            setcurrentTopBar={setcurrentTopBar}
            testcaseData={testcaseData}
            problemMeta={problemMeta}
          />
        </div>
      </ResizablePanels>
    </div>
  );
};

export default CodeEditor;