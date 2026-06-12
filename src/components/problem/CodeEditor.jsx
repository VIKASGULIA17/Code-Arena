import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_VERSIONS } from "../../data/constants";
import TestCases from "./TestCases";
import { userCode } from "../../data/UserCodeTemplate";
import { problemSolutions } from "../../data/solution";
import ResizablePanels from "../utils/ResizablePanel";

const CodeEditor = ({ problemId, codeTemplates, contestId, isContest, setcurrentTopBar, testcaseData, problemMeta }) => {

  const LanguageList = Object.entries(LANGUAGE_VERSIONS);   //all the language and versions
  const [Language, setLanguage] = useState(LanguageList[0]);

  const CodeEditorRef = useRef(); //refrence ot code editor
  const [Output, setOutput] = useState(null); // output (here because if i want to reset the code ,testcases get reset too)

  const currentLang = Language[0];

  const onMount = (editor) => { //to focus on editor on refresh
    CodeEditorRef.current = editor;
    editor.focus();
  };

  const getInitialCode = () => {
    const cleanTemplate = codeTemplates?.[currentLang] || " no template found";
    const draftKey = `codearena_draft_${isContest ? (contestId || 'default') : 'default'}_${problemId}_${currentLang}`;
    const draft = localStorage.getItem(draftKey);
    return draft || cleanTemplate;
  };

  const [Code, setCode] = useState(getInitialCode); //current code of the user 

  useEffect(() => {
    const cleanTemplate = codeTemplates?.[currentLang] || " no template found";
    const draftKey = `codearena_draft_${isContest ? (contestId || 'default') : 'default'}_${problemId}_${currentLang}`;
    const draft = localStorage.getItem(draftKey);
    const initialCode = draft || cleanTemplate;

    setCode(initialCode);
    setOutput(null);
    if (CodeEditorRef.current) {
      CodeEditorRef.current.setValue(initialCode);
    }
  }, [problemId, currentLang, codeTemplates, isContest, contestId]);

  const handleReset = () => {
    const cleanTemplate = codeTemplates?.[currentLang] || " no template found";
    const draftKey = `codearena_draft_${isContest ? (contestId || 'default') : 'default'}_${problemId}_${currentLang}`;
    localStorage.removeItem(draftKey);

    setCode(cleanTemplate);
    setOutput(null);
    if (CodeEditorRef.current) {
      CodeEditorRef.current.setValue(cleanTemplate);
    }
  };

  return (
    <div className="flex flex-col h-full w-full gap-0">
      <LanguageSelector
        LanguageList={LanguageList}
        Language={Language}
        setLanguage={setLanguage}
        onReset={handleReset}
      />
      <ResizablePanels direction="vertical" initialSize={50}>
        {/* Editor Panel */}
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Editor
            height="100%"
            language={Language[0]}

            value={Code}

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