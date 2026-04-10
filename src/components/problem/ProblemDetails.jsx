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
  Code2
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
import { useAppContext } from "../../context/AppContext"; // Need this for auth data!

const ProblemTopBar = ({ problemData, isJwtExist, userDetails, username, logout }) => {
  const [elapsed, setElapsed] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false);
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

  const diffColor =
    problemData?.difficulty === "Easy"
      ? "text-green-600 bg-green-100"
      : problemData?.difficulty === "Medium"
        ? "text-yellow-600 bg-yellow-100"
        : "text-red-600 bg-red-100";

  return (
    <header className="h-13 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 z-30 py-2 gap-4">
      {/* LEFT: back + logo + title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          to="/problem"
          className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
          title="Problem List"
        >
          <ArrowLeft size={14} className="text-gray-600" />
        </Link>
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <div className="w-6 h-6 bg-linear-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
            <Code2 size={13} className="text-white" />
          </div>
          <span className="font-bold text-sm bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden md:block">
            Code Arena
          </span>
        </Link>
        <span className="text-gray-300 hidden sm:block">|</span>
        <div className="hidden sm:flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-gray-800 truncate max-w-[180px] lg:max-w-xs">
            {problemData?.title || "Problem"}
          </span>
          {problemData?.difficulty && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${diffColor}`}>
              {problemData.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* CENTER: Problems list */}
      <div className="hidden lg:flex items-center">
        <Link
          to="/problem"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <LayoutList size={14} />
          Problem List
        </Link>
      </div>

      {/* RIGHT: timer + auth */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-mono text-gray-600">
          <Timer size={13} className="text-blue-500" />
          {fmt(elapsed)}
        </div>

        {isJwtExist ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
            >
              <img
                src={userDetails?.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-6 h-6 rounded-full border border-gray-200 object-cover"
              />
              <span className="text-xs font-medium text-gray-700 hidden sm:block capitalize">{userDetails?.fullName || username}</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                <Link
                  to={`/profile/${username}`}
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <User size={14} />
                  Profile
                </Link>
                <Link
                  to="/problem"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <LayoutList size={14} />
                  Problem List
                </Link>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
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
              className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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

  // 1. Get auth variables from context to pass into the TopBar
  const { isJwtExist, userDetails, username, setisJwtExist, setisLoggedIn, setjwtToken } = useAppContext();
  
  const problem = problemInfo[id]; 
  const [currentTopBar, setcurrentTopBar] = useState("Description"); 

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setcurrentTopBar("Description");
  }, [id]);

  // if (!problem) {
  //   return <NotFound />
  // }

  const [problemDetailsInfo, setProblemDetailsInfo] = useState({})
  const [problemBasicInfo, setProblemBasicInfo] = useState({})
  const [loading, setloading] = useState(true)

  const fetchProblemDetail = async () => {
  setloading(true); 

  try {
    const [detailResponse, basicResponse] = await Promise.all([
      axios.get(`${BACKEND_URL}/public/fetchProblemDetail/${id}`),
      axios.get(`${BACKEND_URL}/public/fetchOne/${id}`)
    ]);

    console.log("Detail Response:", detailResponse.data);
    // console.log("Basic Response:", basicResponse.data);

    setProblemDetailsInfo(detailResponse.data.data);
    setProblemBasicInfo(basicResponse.data.problem);
    
  } catch (error) {
    console.error("Failed to fetch problem details:", error);
    setProblemDetailsInfo([]); 
    setProblemBasicInfo([]);
  } finally {
    setloading(false); 
  }
};

  useEffect(() => {
    fetchProblemDetail();
  }, [id]);

  // Logout function to pass into the TopBar
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setisJwtExist(false);
    setisLoggedIn(false);
    setjwtToken(null);
    window.location.href = '/'; // Redirect to home
  }

  

  if(loading){
    return <Loading />
  }

  if(!problemDetailsInfo){
    return <NotFound />
  }
const description = problemDetailsInfo?.description;
const editorial = problemDetailsInfo?.editorial;
const algorithmSteps = problemDetailsInfo?.algorithmSteps; 
const timeComplexity = problemDetailsInfo?.timeComplexity; 
const spaceComplexity = problemDetailsInfo?.spaceComplexity; 
const codeImplementation = problemDetailsInfo?.solutions;
const codeTemplates = problemDetailsInfo?.templates;

  const TabButton = ({ label, icon: Icon }) => { 
    const isActive = currentTopBar === label;
    return (
      <Button
        variant="ghost"
        onClick={() => setcurrentTopBar(label)}
        className={`relative rounded-none h-10 px-4 font-semibold hover:bg-transparent transition-all gap-2 ${isActive ? "text-pink-500" : "text-gray-500"
          }`}
      >
        <Icon size={16} />
        <h1 >{label}</h1>
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        )}
      </Button>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* 2. PLACED TOP BAR HERE - It spans the entire width at the top */}
      <ProblemTopBar 
        problemData={problemBasicInfo} 
        isJwtExist={isJwtExist} 
        userDetails={userDetails} 
        username={username} 
        logout={handleLogout} 
      />

      {/* Main Content Area (Split into Left and Right Panes) */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Pane (Description, Solution, etc.) */}
        <div className="w-full lg:w-1/2 flex flex-col h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-2 min-h-10 shrink-0">
            {isContest ?
              <TabButton label="Description" icon={Lightbulb} />
              :
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <TabButton label="Description" icon={FileText} />
                <TabButton label="Solution" icon={Lightbulb} />
                <TabButton label="Discussion" icon={MessagesSquare} />
                <TabButton label="Submissions" icon={History} />
              </div>
            }
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {currentTopBar === "Description" ? (
              <Description description={description} basicInfo={problemBasicInfo} />
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
        <div className="w-full lg:w-1/2 flex flex-col h-[50vh] lg:h-full bg-white">
          <CodeEditor 
            codeTemplates={codeTemplates} 
            problemId={id} 
            setcurrentTopBar={setcurrentTopBar} 
            isContest={isContest} 
          />
        </div>

      </div>
    </div>
  );
};

export default ProblemDetails;