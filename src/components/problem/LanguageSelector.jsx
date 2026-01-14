import React,{useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { PiDropDuotone } from "react-icons/pi";
import { ChevronDown, Rotate3D, RotateCcw, RotateCw } from "lucide-react";
import Stopwatch from "../others/StopWatch";
import { CODE_SNIPPETS } from "../../data/constants";

const LanguageSelector = ({ Language, setLanguage, LanguageList, setCode }) => {
  const handleCodeReset = () => {
    setCode(CODE_SNIPPETS[Language[0]]);
    setcodeResetFlag(true);

    setTimeout(() => {
      setcodeResetFlag(false)
    }, 2000);
  };

  const [codeResetFlag, setcodeResetFlag] = useState(false);

  return (
    <div className="h-15 flex border-b w-full">
      <div className="mx-6 py-3 ">
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
            {LanguageList.map(([lang, version],i) => {
              const isTrue = lang === Language[0];

              return (
                !isTrue && (
                  <div
                  key={i}
                    onClick={() => {
                      setLanguage([lang, version]);
                      setCode(CODE_SNIPPETS[lang])
                    }}
                  >
                    <DropdownMenuItem>
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
          className="cursor-pointer text-gray-700"
          onClick={handleCodeReset}
          />
       <p className={`duration-500 ${codeResetFlag?'block ':'hidden ' } bg-green-200 rounded-sm px-2 py-1 text-green-600 border-green-400 border`}>Code Reset SuccessFully!</p> 
          </div>
        <Stopwatch />
      </div>
    </div>
  );
};

export default LanguageSelector;
