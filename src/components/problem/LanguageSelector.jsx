import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, RotateCw } from "lucide-react";
import Stopwatch from "../others/StopWatch";
import { userCode } from "../../data/UserCodeTemplate";
import { problemSolutions } from "../../data/solution";

const LanguageSelector = ({
  Language,
  setLanguage,
  LanguageList,
  setCode,
  codeTemplates,
  setOutput,
  onReset,
}) => {
  const [codeResetFlag, setcodeResetFlag] = useState(false);

  const handleCodeReset = () => {
    if (onReset) {
      onReset();
    }
    setcodeResetFlag(true);
    setOutput(null);

    setTimeout(() => {
      setcodeResetFlag(false);
    }, 2000);
  };

  const handleLanguageChange = (lang, version) => {
    setLanguage([lang, version]);
      const newBoilerPlate=codeTemplates?.[lang]|| "NO template"
    setCode(newBoilerPlate);
  };

  return (
    <div className="h-15 flex border-b border-slate-200 dark:border-slate-700 w-full bg-white dark:bg-slate-900">
      <div className="pl-3 lg:px-6 py-3 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center capitalize gap-2 border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
              <h1>{Language[0]}</h1>
              <p className="text-gray-500 dark:text-slate-400 text-[13px] font-normal">
                {Language[1]}
              </p>
              <ChevronDown className="text-slate-400" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="dark:bg-slate-800 dark:border-slate-700">
            {LanguageList.map(([lang, version], i) => {
              const isSelected = lang === Language[0];

              return (
                !isSelected && (
                  <div
                    key={i}
                    onClick={() => handleLanguageChange(lang, version)}
                  >
                    <DropdownMenuItem className="cursor-pointer dark:hover:bg-slate-700 dark:focus:bg-slate-700">
                      <p className="capitalize dark:text-slate-200">{lang}</p>
                      <p className="text-gray-500 dark:text-slate-400 text-[13px] font-normal">
                        {version}
                      </p>
                    </DropdownMenuItem>
                  </div>
                )
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <RotateCw
            size={15}
            className="cursor-pointer text-gray-700 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:rotate-180 transition-transform duration-500"
            onClick={handleCodeReset}
          />
          <p
            className={`duration-500 ${
              codeResetFlag ? "opacity-100" : "opacity-0"
            } bg-green-200 dark:bg-green-500/20 rounded-sm px-2 py-1 text-green-600 dark:text-green-400 border-green-400 dark:border-green-500/30 border text-xs`}
          >
            Code Reset Successfully!
          </p>
        </div>
        <Stopwatch />
      </div>
    </div>
  );
};

export default LanguageSelector;