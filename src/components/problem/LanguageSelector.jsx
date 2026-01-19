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
import { driverCode_Template } from "../../data/driverCodeTemplate";

const LanguageSelector = ({
  Language,
  setLanguage,
  LanguageList,
  setCode,
  problemId,
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

    const newBoilerplate =
      driverCode_Template[problemId]?.[lang]?.boilerplate || "";
    setCode(newBoilerplate);
  };

  return (
    <div className="h-15 flex border-b w-full">
      <div className="pl-3 lg:px-6 py-3 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center capitalize gap-2 border-2">
              <h1>{Language[0]}</h1>
              <p className="text-gray-500 text-[13px] font-normal">
                {Language[1]}
              </p>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {LanguageList.map(([lang, version], i) => {
              const isSelected = lang === Language[0];

              return (
                !isSelected && (
                  <div
                    key={i}
                    onClick={() => handleLanguageChange(lang, version)}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <p className="capitalize">{lang}</p>
                      <p className="text-gray-500 text-[13px] font-normal">
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
            className="cursor-pointer text-gray-700 hover:rotate-180 transition-transform duration-500"
            onClick={handleCodeReset}
          />
          <p
            className={`duration-500 ${
              codeResetFlag ? "opacity-100" : "opacity-0"
            } bg-green-200 rounded-sm px-2 py-1 text-green-600 border-green-400 border text-xs`}
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