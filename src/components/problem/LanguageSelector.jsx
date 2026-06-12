import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, RotateCw } from "lucide-react";
import Stopwatch from "../others/StopWatch";

const LanguageSelector = ({
  Language,
  setLanguage,
  LanguageList,
  onReset,
}) => {
  const [codeResetFlag, setcodeResetFlag] = useState(false);

  const handleCodeReset = () => {
    if (onReset) {
      onReset();
    }
    setcodeResetFlag(true);

    setTimeout(() => {
      setcodeResetFlag(false);
    }, 2000);
  };

  const handleLanguageChange = (lang, version) => {
    setLanguage([lang, version]);
  };

  const getLanguageColor = (lang) => {
    switch (lang.toLowerCase()) {
      case "python":
        return "bg-sky-500";
      case "javascript":
        return "bg-amber-500";
      case "cpp":
      case "c++":
        return "bg-indigo-500";
      case "java":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="h-11 flex items-center justify-between border-b border-border bg-card px-3 w-full select-none">
      {/* Left side: Language Dropdown and Reset Button */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center capitalize gap-2 h-8 px-2.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/65 transition-colors cursor-pointer focus:outline-none"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${getLanguageColor(Language[0])} shrink-0`} />
              <span>{Language[0]}</span>
              <span className="text-muted-foreground/60 text-[10px] font-mono font-normal">
                {Language[1]}
              </span>
              <ChevronDown className="text-muted-foreground opacity-60 ml-0.5" size={11} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-card border border-border rounded-xl min-w-[130px] p-1 shadow-lg z-50">
            {LanguageList.map(([lang, version], i) => {
              const isSelected = lang === Language[0];

              return (
                !isSelected && (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => handleLanguageChange(lang, version)}
                    className="cursor-pointer rounded-lg px-2 py-1.5 hover:bg-muted focus:bg-muted transition-colors flex items-center gap-2 text-xs font-semibold text-foreground"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${getLanguageColor(lang)} shrink-0`} />
                    <span className="capitalize">{lang}</span>
                    <span className="ml-auto text-muted-foreground text-[10px] font-mono font-normal">
                      {version}
                    </span>
                  </DropdownMenuItem>
                )
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCodeReset}
            className="group flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/65 transition-all cursor-pointer focus:outline-none"
            title="Reset code template"
          >
            <RotateCw
              size={11}
              className={`${codeResetFlag ? "animate-spin text-emerald-500" : "group-hover:rotate-180 transition-transform duration-500"}`}
            />
            <span>Reset</span>
          </button>

          {codeResetFlag && (
            <span className="text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-full px-2 py-0.5 animate-fade-in whitespace-nowrap">
              Reset successfully!
            </span>
          )}
        </div>
      </div>

      {/* Right side: Stopwatch */}
      <div className="flex items-center">
        <Stopwatch />
      </div>
    </div>
  );
};

export default LanguageSelector;