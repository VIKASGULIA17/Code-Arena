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
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditor";
import Description from "./problemPages/Description";
import Solution from "./problemPages/Solution";
import Discussion from "./problemPages/Discussion";
import NotFound from "../../Pages/NotFound";
import Submission from "./problemPages/Submission";
import axios from "axios";
import Loading from "../../components/others/Loading";
import { useAppContext } from "../../context/AppContext";
import ResizablePanels from "../utils/ResizablePanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProblemTopBar = ({
  problemData,
  isJwtExist,
  userDetails,
  username,
  logout,
  isDarkMode,
  setIsDarkMode,
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
    <header className="h-13 border-b border-slate-200 bg-white/95 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-30 py-2 gap-4">
      {/* LEFT: back + logo + title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          to="/problem"
          className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200 shrink-0"
          title="Problem List"
        >
          <ArrowLeft size={14} className="text-slate-600" />
        </Link>
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-md flex items-center justify-center">
            <Code2 size={13} className="text-white" />
          </div>
          <span className="font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden md:block">
            Code Arena
          </span>
        </Link>
        <span className="text-slate-300 hidden sm:block">|</span>
        <div className="hidden sm:flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-slate-800 truncate max-w-[180px] lg:max-w-xs">
            {problemData?.title || "Problem"}
          </span>
          {problemData?.difficulty && (
            <span className={`${diffBadge} text-[11px]`}>
              {problemData.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* CENTER: Problems list */}
      <div className="hidden lg:flex items-center">
        <Link
          to="/problem"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
        >
          <LayoutList size={14} />
          Problem List
        </Link>
      </div>

      {/* RIGHT: theme toggle + timer + auth */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Theme toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all duration-200"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-code text-slate-600">
          <Timer size={13} className="text-indigo-500" />
          {fmt(elapsed)}
        </div>

        {isJwtExist ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 hover:bg-slate-100 rounded-lg px-2 py-1 transition-colors duration-200"
            >
              <img
                src={userDetails?.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-6 h-6 rounded-full border border-slate-200 object-cover"
              />
              <span className="text-xs font-medium text-slate-700 hidden sm:block capitalize">
                {userDetails?.fullName || username}
              </span>
              <ChevronDown
                size={12}
                className={`text-slate-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 z-50 py-1 overflow-hidden animate-scale-in">
                <Link
                  to={`/profile/${username}`}
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                >
                  <User size={14} />
                  Profile
                </Link>
                <Link
                  to="/problem"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                >
                  <LayoutList size={14} />
                  Problem List
                </Link>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 w-full text-left"
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
              className="px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200/50"
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
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    return <Loading />;
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
      <Button
        variant="ghost"
        onClick={() => setcurrentTopBar(label)}
        className={`relative rounded-none h-10 px-4 font-medium hover:bg-transparent transition-all duration-200 gap-2 text-sm ${
          isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <Icon size={15} />
        <span>{label}</span>
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />
        )}
      </Button>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#fafafa]">
      <ToastContainer />
      <ProblemTopBar
        problemData={problemDetailsInfo}
        isJwtExist={isJwtExist}
        userDetails={userDetails}
        username={username}
        logout={handleLogout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <ResizablePanels direction="horizontal" initialSize={50}>
        {/* Left Pane (Description) */}
        <div className="flex flex-col h-full w-full border-r border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-2 min-h-10 shrink-0">
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

          <div className="flex-1 overflow-y-auto p-5 bg-white">
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
        <div className={`flex flex-col h-full w-full ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
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
  );
};

export default ProblemDetails;
