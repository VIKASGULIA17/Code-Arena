import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Lightbulb,
  MessagesSquare,
  History,
  LayoutList,
  Timer,
  LogOut,
  ChevronDown,
  User,
  Code2,
  Sun,
  Moon,
} from "lucide-react";
import { problemInfo } from "../../data/dsaProblem";
import CodeEditor from "./CodeEditor";
import Description from "./problemPages/Description";
import Solution from "./problemPages/Solution";
import Discussion from "./problemPages/Discussion";
import NotFound from "../../Pages/NotFound";
import Submission from "./problemPages/Submission";
import axios from "axios";
import Loading from "../../components/others/Loading";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import ResizablePanels from "../utils/ResizablePanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProblemTopBar = ({
  problemData,
  isJwtExist,
  userDetails,
  username,
  logout,
  resolvedTheme,
  cycleTheme,
  activeCenterTab,
  setActiveCenterTab,
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fmt = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const diffBadge =
    problemData?.difficulty === "Easy"
      ? "badge-success"
      : problemData?.difficulty === "Medium"
        ? "badge-warning"
        : "badge-danger";

  return (
    <header className="h-13 border-b border-border bg-card/95 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-30 py-2 gap-4 text-foreground">
      {/* LEFT: back + logo + title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          to="/problem"
          className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
          title="Problem List"
        >
          <ArrowLeft size={14} />
        </Link>
        <Link to="/" className="hidden sm:flex items-center gap-1.5 shrink-0">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-655 to-purple-655 rounded-md flex items-center justify-center">
            <Code2 size={13} className="text-white" />
          </div>
          <span className="font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hidden md:block">
            Code Arena
          </span>
        </Link>
        <span className="text-border hidden sm:block">|</span>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs sm:text-sm font-semibold text-foreground truncate max-w-[80px] sm:max-w-[180px] lg:max-w-xs">
            {problemData?.title || "Problem"}
          </span>
          {problemData?.difficulty && (
            <span className={`${diffBadge} text-[11px] shrink-0`}>
              {problemData.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* CENTER: Problems list */}
      <div className="hidden lg:flex items-center">
        <Link
          to="/problem"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
        >
          <LayoutList size={14} />
          Problem List
        </Link>
      </div>

      {/* RIGHT: theme toggle + timer + auth */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Mobile View Switcher (Tabs for Description vs Editor) */}
        <div className="flex border border-border rounded-xl p-0.5 bg-muted lg:hidden shrink-0">
          <button
            onClick={() => setActiveCenterTab("description")}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              activeCenterTab === "description" ? "bg-indigo-600 text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveCenterTab("editor")}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              activeCenterTab === "editor" ? "bg-indigo-600 text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Editor
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 cursor-pointer"
          title="Toggle Theme"
        >
          {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Timer */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-mono text-muted-foreground">
          <Timer size={13} className="text-indigo-500" />
          {fmt(elapsed)}
        </div>

        {isJwtExist ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 hover:bg-muted rounded-lg px-2 py-1 transition-colors duration-200 cursor-pointer"
            >
              <img
                src={userDetails?.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-6 h-6 rounded-full border border-border object-cover"
              />
              <span className="text-xs font-medium text-foreground hidden sm:block capitalize">
                {userDetails?.fullName || username}
              </span>
              <ChevronDown
                size={12}
                className={`text-muted-foreground transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-card border border-border rounded-xl shadow-xl shadow-slate-900/10 dark:shadow-black/50 z-50 py-1 overflow-hidden animate-scale-in">
                <Link
                  to={`/profile/${username}`}
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
                >
                  <User size={14} />
                  Profile
                </Link>
                <Link
                  to="/problem"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
                >
                  <LayoutList size={14} />
                  Problem List
                </Link>
                <div className="border-t border-border mt-1 pt-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors duration-150 w-full text-left cursor-pointer"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-3 py-1.5 text-xs font-semibold text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200/50"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

const ProblemDetails = ({ isContest, problemId }) => {
  const { id: paramId } = useParams();
  const id = isContest ? problemId : paramId;
  const { resolvedTheme, cycleTheme } = useTheme();
  const [activeCenterTab, setActiveCenterTab] = useState("description"); // "description" | "editor" for mobile

  const {
    isJwtExist,
    userDetails,
    username,
    setisJwtExist,
    setisLoggedIn,
    setjwtToken,
  } = useAppContext();

  const problem = problemInfo[id];
  const [currentTopBar, setcurrentTopBar] = useState("Description");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setcurrentTopBar("Description");
  }, [id]);

  const [problemDetailsInfo, setProblemDetailsInfo] = useState({});
  const [testcasesdata, settestcasesdata] = useState({});
  const [loading, setloading] = useState(true);

  const fetchProblemDetail = async () => {
    setloading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/public/getEntireProblem/${id}`,
      );
      setProblemDetailsInfo(response.data.problemDTO);
      settestcasesdata(response.data.listOfTestcase);
    } catch (error) {
      console.error("Failed to fetch problem details:", error);
      setProblemDetailsInfo([]);
      settestcasesdata([]);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchProblemDetail();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setisJwtExist(false);
    setisLoggedIn(false);
    setjwtToken(null);
    window.location.href = "/";
  };

  if (loading) {
    return <Loading message="Fetching problem" />;
  }

  if (!problemDetailsInfo) {
    return <NotFound />;
  }

  const description = problemDetailsInfo?.description;
  const editorial = problemDetailsInfo?.editorial;
  const algorithmSteps = problemDetailsInfo?.algorithmSteps;
  const timeComplexity = problemDetailsInfo?.timeComplexity;
  const spaceComplexity = problemDetailsInfo?.spaceComplexity;
  const codeImplementation = problemDetailsInfo?.solutions;
  const codeTemplates = problemDetailsInfo?.templates;

  const tabs = [
    { label: "Description", icon: FileText },
    { label: "Solution", icon: Lightbulb },
    { label: "Discussion", icon: MessagesSquare },
    { label: "Submissions", icon: History },
  ];

  const TabButton = ({ label, icon: Icon }) => {
    const isActive = currentTopBar === label;
    return (
      <button
        onClick={() => setcurrentTopBar(label)}
        className={`flex items-center gap-1.5 px-4 h-10 text-xs font-bold relative transition-all cursor-pointer border-b-2 ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400 border-indigo-500"
            : "text-muted-foreground hover:text-foreground border-transparent"
        }`}
      >
        <Icon size={13} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <ToastContainer />
      <ProblemTopBar
        problemData={problemDetailsInfo}
        isJwtExist={isJwtExist}
        userDetails={userDetails}
        username={username}
        logout={handleLogout}
        resolvedTheme={resolvedTheme}
        cycleTheme={cycleTheme}
        activeCenterTab={activeCenterTab}
        setActiveCenterTab={setActiveCenterTab}
      />

      {/* Desktop Layout (Split-pane) */}
      <div className="hidden lg:flex flex-1 min-h-0 w-full bg-background">
        <ResizablePanels
          direction="horizontal"
          initialSize={50}
          minSize={20}
          maxSize={80}
          className="flex-1 h-full w-full"
        >
          {/* Left Pane (Description Tabs) */}
          <div className="flex flex-col h-full w-full border-r border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-card px-2 min-h-10 shrink-0">
              {isContest ? (
                <TabButton label="Description" icon={Lightbulb} />
              ) : (
                <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => (
                    <TabButton key={tab.label} label={tab.label} icon={tab.icon} />
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-card text-muted-foreground">
              {currentTopBar === "Description" ? (
                <Description
                  description={description}
                  basicInfo={problemDetailsInfo}
                />
              ) : currentTopBar === "Solution" ? (
                <Solution
                  editorial={editorial}
                  algorithmSteps={algorithmSteps}
                  timeComplexity={timeComplexity}
                  spaceComplexity={spaceComplexity}
                  implementation={codeImplementation}
                  setcurrentTopBar={setcurrentTopBar}
                />
              ) : currentTopBar === "Discussion" ? (
                <Discussion id={id} />
              ) : (
                <Submission id={id} />
              )}
            </div>
          </div>

          {/* Right Pane (Code Editor) */}
          <div className={`flex flex-col h-full w-full ${resolvedTheme === "dark" ? "bg-[#131c31]" : "bg-white"} overflow-hidden`}>
            <CodeEditor
              codeTemplates={codeTemplates}
              problemId={id}
              problemMeta={problemDetailsInfo}
              testcaseData={testcasesdata}
              setcurrentTopBar={setcurrentTopBar}
              isContest={isContest}
            />
          </div>
        </ResizablePanels>
      </div>

      {/* Mobile Layout (Tabs Selection) */}
      <div className="flex lg:hidden flex-1 min-h-0 w-full bg-background">
        {activeCenterTab === "description" ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-card border-b border-border">
            <div className="flex items-center justify-between border-b border-border bg-card px-2 min-h-10 shrink-0">
              {isContest ? (
                <TabButton label="Description" icon={Lightbulb} />
              ) : (
                <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => (
                    <TabButton key={tab.label} label={tab.label} icon={tab.icon} />
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-card text-muted-foreground">
              {currentTopBar === "Description" ? (
                <Description
                  description={description}
                  basicInfo={problemDetailsInfo}
                />
              ) : currentTopBar === "Solution" ? (
                <Solution
                  editorial={editorial}
                  algorithmSteps={algorithmSteps}
                  timeComplexity={timeComplexity}
                  spaceComplexity={spaceComplexity}
                  implementation={codeImplementation}
                  setcurrentTopBar={setcurrentTopBar}
                />
              ) : currentTopBar === "Discussion" ? (
                <Discussion id={id} />
              ) : (
                <Submission id={id} />
              )}
            </div>
          </div>
        ) : (
          <div className={`flex-1 flex flex-col h-full ${resolvedTheme === "dark" ? "bg-[#131c31]" : "bg-white"} overflow-hidden`}>
            <CodeEditor
              codeTemplates={codeTemplates}
              problemId={id}
              problemMeta={problemDetailsInfo}
              testcaseData={testcasesdata}
              setcurrentTopBar={setcurrentTopBar}
              isContest={isContest}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;
