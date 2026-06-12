import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { dsaProblems, problemInfo } from '../../data/dsaProblem';
import { userCode } from '../../data/UserCodeTemplate';
import { Button } from '../ui/button';
import CodeEditor from '../problem/CodeEditor';
import Description from '../problem/problemPages/Description';
import Submission from '../problem/problemPages/Submission';
import ResizablePanels from '../utils/ResizablePanel';
import { Kbd } from '../ui/kbd';
import { toast } from 'react-toastify';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, ArrowLeft, ChevronRight, ChevronLeft,
  X, Check, History, LogOut, ChevronDown, User,
  Keyboard, AlertTriangle, ShieldAlert,
  Info, Sun, Moon, Trophy, FileText, List, RefreshCw
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Dedicated Countdown Timer Component for performance (avoids re-rendering the whole page every second)
const CountdownTimer = ({ startTime, durationHours, onTimerEnd, onFifteenMinutesRemaining }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState('RUNNING'); // RUNNING, UPCOMING, ENDED
  const fifteenMinTriggeredRef = useRef(false);
  const endedTriggeredRef = useRef(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const startMs = new Date(startTime).getTime();
      const durationMs = durationHours * 60 * 60 * 1000;
      const endMs = startMs + durationMs;

      if (now < startMs) {
        setStatus('UPCOMING');
        return Math.max(0, Math.floor((startMs - now) / 1000));
      } else if (now < endMs) {
        setStatus('RUNNING');
        return Math.max(0, Math.floor((endMs - now) / 1000));
      } else {
        setStatus('ENDED');
        return 0;
      }
    };

    const initialSecs = calculateTime();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(initialSecs);

    const interval = setInterval(() => {
      const secs = calculateTime();
      setTimeLeft(secs);

      if (status === 'RUNNING') {
        if (secs <= 900 && secs > 0 && !fifteenMinTriggeredRef.current) {
          fifteenMinTriggeredRef.current = true;
          if (onFifteenMinutesRemaining) onFifteenMinutesRemaining();
        }
        if (secs === 0 && !endedTriggeredRef.current) {
          endedTriggeredRef.current = true;
          if (onTimerEnd) onTimerEnd();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, durationHours, status, onTimerEnd, onFifteenMinutesRemaining]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0')
    ].join(':');
  };

  if (status === 'ENDED') {
    return (
      <span className="text-red-500 font-extrabold tracking-wider uppercase bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-xl animate-pulse text-xs md:text-sm">
        Contest Ended
      </span>
    );
  }

  const isCritical = status === 'RUNNING' && timeLeft <= 900; // less than 15 mins
  const isWarning = status === 'RUNNING' && timeLeft <= (durationHours * 3600) / 2; // less than 50%

  let colorClass = 'text-emerald-500 dark:text-emerald-400 font-mono';
  let containerBg = 'bg-emerald-500/10 border-emerald-500/20';

  if (isCritical) {
    colorClass = 'text-red-500 dark:text-red-400 font-mono font-bold animate-pulse';
    containerBg = 'bg-red-500/15 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
  } else if (isWarning) {
    colorClass = 'text-amber-500 dark:text-amber-400 font-mono';
    containerBg = 'bg-amber-500/10 border-amber-500/20';
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${containerBg} transition-all duration-300`}>
      <Clock size={15} className={isCritical ? 'text-red-500 dark:text-red-400 animate-pulse' : isWarning ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'} />
      <span className={`${colorClass} text-xs md:text-sm font-bold tracking-wider`}>
        {formatTime(timeLeft)}
      </span>
      {status === 'UPCOMING' && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold ml-1">Starts In</span>
      )}
    </div>
  );
};

const fallbackStartTime = Date.now() - 30 * 60 * 1000;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const OngoingContestPage = () => {
  const { contestName: contestId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { allProblem, allContest, userDetails, username, isJwtExist, jwtToken } = useAppContext();
  const { resolvedTheme, cycleTheme } = useTheme();
  // console.log("hello")
  // console.log("contest id is", contestId);


  // console.log(contestIdFromParam)

  const resolvedContestData = useMemo(() => {
    const stateContest = location.state?.contest;
    // console.log(stateContest)
    if (stateContest) return stateContest;
    if (!allContest) return null;
    return allContest.find(c =>
      String(c.contestId) === contestId
    ) || null;
  }, [location.state, allContest, contestId]);

  const [fetchedProblems, setfetchedProblems] = useState(() => {
    const cached = sessionStorage.getItem(`contest_problem_${contestId}`);
    if (cached && cached !== "undefined") {
      try {
        console.log("hi");
        console.log(JSON.parse(cached));
        return JSON.parse(cached);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Problems List Setup
  useEffect(() => {
    const fetchContestProblem = async () => {
      const cacheKey = `contest_problem_${contestId}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData && cachedData !== "undefined") {
        try {
          setfetchedProblems(JSON.parse(cachedData));
          return;
        } catch {
          // Fall back to fetching if parsing fails
        }
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/contest/fetchContestProblemForUser/${contestId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log(response.data);

        if (response.data) {
          // saving it to session storage
          sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
          setfetchedProblems(response.data);
        }
      }
      catch (error) {
        console.log(error);
      }
    };

    if (contestId && jwtToken) {
      fetchContestProblem();
    }
  }, [contestId, jwtToken]);



  const ContestProblems = useMemo(() => {
    let selectedProblems = fetchedProblems && fetchedProblems.length > 0 ? fetchedProblems : [];

    if (selectedProblems.length === 0) {
      const sourceData = allProblem && allProblem.length > 0 ? allProblem : dsaProblems;
      // Fallback selection of 4 standard problems to represent typical contest
      const easyProb = sourceData.filter(p => p.difficulty === 'Easy');
      const medProb = sourceData.filter(p => p.difficulty === 'Medium');
      const hardProb = sourceData.filter(p => p.difficulty === 'Hard');

      const p1 = easyProb[0] || sourceData[0];
      const p2 = medProb[0] || sourceData[1];
      const p3 = medProb[1] || sourceData[2];
      const p4 = hardProb[0] || sourceData[3];

      selectedProblems = [p1, p2, p3, p4].filter(Boolean);
    }

    return selectedProblems.map((problem, idx) => ({
      ...problem,
      id: problem.problemId || problem.id,
      label: String.fromCharCode(65 + idx),
      score: idx === 0 ? 100 : idx === 1 ? 250 : idx === 2 ? 500 : 1000,
    }));
  }, [allProblem, fetchedProblems]);

  // Page States - Left sidebar open by default, Right sidebar collapsed by default
  const [activeIndex, setactiveIndex] = useState(0);
  const activeProblem = ContestProblems[activeIndex] || null;

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [currentTopBar, setcurrentTopBar] = useState('Description');
  const [activeCenterTab, setActiveCenterTab] = useState('description'); // 'description' | 'editor' for mobile

  const testcaseData = useMemo(() => {
    if (!activeProblem) return [];
    let list = activeProblem.listOfTestcase || 
               activeProblem.testCases || 
               activeProblem.testcases || 
               activeProblem.listOfTestcases;
               
    if (typeof list === 'string') {
      try {
        list = JSON.parse(list);
      } catch {
        list = null;
      }
    }
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
    const mockInfo = problemInfo[activeProblem.id];
    if (mockInfo?.examples) {
      return mockInfo.examples.map((ex, i) => ({
        id: i + 1,
        input: ex.input,
        output: ex.output,
        expected: ex.output,
        hidden: false
      }));
    }
    return [];
  }, [activeProblem]);

  const loadingDetails = !activeProblem;

  const [problemSubmissions] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  // Overlay Modals
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);

  // Synchronize Monaco Editor Theme with App Theme Backgrounds
  useEffect(() => {
    const applyMonacoTheme = () => {
      if (window.monaco) {
        // Define a custom theme matching the Card Background (#131c31) in dark mode
        window.monaco.editor.defineTheme('codearena-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#131c31', // Exact match of --card in dark mode
            'editorGutter.background': '#131c31',
            'editor.lineHighlightBackground': '#18243e', // Slightly lighter highlight
          }
        });

        // Define a custom theme matching Card Background (#ffffff) in light mode
        window.monaco.editor.defineTheme('codearena-light', {
          base: 'vs',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#ffffff', // Exact match of --card in light mode
            'editorGutter.background': '#ffffff',
            'editor.lineHighlightBackground': '#f3f4f6',
          }
        });

        // Apply theme dynamically
        window.monaco.editor.setTheme(resolvedTheme === 'dark' ? 'codearena-dark' : 'codearena-light');
      }
    };
    applyMonacoTheme();
    // Re-check periodically when editor mounts to enforce custom theme matching
    const t = setInterval(applyMonacoTheme, 1000);
    return () => clearInterval(t);
  }, [resolvedTheme]);

  // Re-fetch submissions when user switches tab to Submissions
  const handleTabChange = (tab) => {
    setcurrentTopBar(tab);
  };

  // Compute code templates including localStorage drafts, with fallback to mock data if details are not present
  const resolvedProblemDetails = useMemo(() => {
    if (!activeProblem) return null;

    const hasDetails = activeProblem.description && activeProblem.templates;

    let details;
    if (hasDetails) {
      details = { ...activeProblem };
      let templates = details.templates;
      if (typeof templates === 'string') {
        try {
          templates = JSON.parse(templates);
        } catch {
          templates = null;
        }
      }
      details.templates = templates;
      details.id = activeProblem.problemId || activeProblem.id;
      details.fnName = activeProblem.fnName || activeProblem.functionName;
      details.functionName = activeProblem.fnName || activeProblem.functionName;
    } else {
      const mockInfo = problemInfo[activeProblem.id] || {
        title: activeProblem.title,
        description: `You are given a mock description for **${activeProblem.title}**. Write an optimized solution in your language of choice to solve the problem constraints efficiently.`,
        difficulty: activeProblem.difficulty || 'Easy',
        constraints: ['1 <= input.length <= 10^5', 'Time Complexity: O(N)', 'Space Complexity: O(1)'],
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
        ]
      };

      const mockTemplates = {};
      const problemTemplates = userCode[activeProblem.id] || {};
      Object.keys(problemTemplates).forEach(lang => {
        mockTemplates[lang] = problemTemplates[lang]?.boilerplate || '';
      });

      details = {
        id: activeProblem.id,
        title: mockInfo.title || activeProblem.title,
        difficulty: mockInfo.difficulty || activeProblem.difficulty || 'Easy',
        description: mockInfo.description,
        constraints: mockInfo.constraints || [],
        examples: mockInfo.examples || [],
        templates: Object.keys(mockTemplates).length > 0 ? mockTemplates : {
          javascript: `/**\n * @return {any}\n */\nconst solve = function() {\n    // Write your code here\n};`,
          python: `class Solution:\n    def solve(self):\n        # Write your code here\n        pass`,
          cpp: `class Solution {\npublic:\n    void solve() {\n        // Write your code here\n    }\n};`,
          java: `class Solution {\n    public void solve() {\n        // Write your code here\n    }\n}`
        },
        inputType: activeProblem.type || 'Array',
        fnName: activeProblem.fnName || 'solve',
        functionName: activeProblem.fnName || 'solve'
      };
    }

    // Self-healing: Parse function name from template code if missing from metadata
    if (details && !details.fnName && details.templates) {
      let detectedFn = 'solve';
      const pythonTemplate = details.templates.python;
      const jsTemplate = details.templates.javascript;
      if (pythonTemplate && typeof pythonTemplate === 'string') {
        const match = pythonTemplate.match(/def\s+(\w+)\s*\(/);
        if (match && match[1] && match[1] !== 'solve') {
          detectedFn = match[1];
        }
      } else if (jsTemplate && typeof jsTemplate === 'string') {
        const match = jsTemplate.match(/function\s+(\w+)\s*\(/);
        if (match && match[1]) {
          detectedFn = match[1];
        }
      }
      details.fnName = detectedFn;
      details.functionName = detectedFn;
    }

    return details;
  }, [activeProblem, resolvedContestData]);

  const originalTemplates = useMemo(() => {
    if (!activeProblem) return null;
    let templates = activeProblem.templates;
    if (typeof templates === 'string') {
      try {
        templates = JSON.parse(templates);
      } catch {
        templates = null;
      }
    }
    if (!templates) {
      const mockTemplates = {};
      const problemTemplates = userCode[activeProblem.id] || {};
      Object.keys(problemTemplates).forEach(lang => {
        mockTemplates[lang] = problemTemplates[lang]?.boilerplate || '';
      });
      templates = Object.keys(mockTemplates).length > 0 ? mockTemplates : {
        javascript: `/**\n * @return {any}\n */\nconst solve = function() {\n    // Write your code here\n};`,
        python: `class Solution:\n    def solve(self):\n        # Write your code here\n        pass`,
        cpp: `class Solution {\npublic:\n    void solve() {\n        // Write your code here\n    }\n};`,
        java: `class Solution {\n    public void solve() {\n        // Write your code here\n    }\n}`
      };
    }
    return templates;
  }, [activeProblem]);

  // Code Auto-save logic (runs every 3 seconds)
  useEffect(() => {
    if (!activeProblem) return;
    const autoSaveInterval = setInterval(() => {
      if (!window.monaco) return;
      const models = window.monaco.editor.getModels();
      if (models && models.length > 0) {
        const activeCode = models[0].getValue();
        const activeLang = models[0].getLanguageId();
        const draftKey = `codearena_draft_${resolvedContestData?.contestId || 'default'}_${activeProblem.id}_${activeLang}`;
        const currentSaved = localStorage.getItem(draftKey);
        if (activeCode && activeCode !== currentSaved) {
          localStorage.setItem(draftKey, activeCode);
          setIsDirty(true);
        }
      }
    }, 3000);

    return () => clearInterval(autoSaveInterval);
  }, [activeProblem?.id, resolvedContestData]);

  // Manual save draft handler
  const handleSaveDraftManual = () => {
    if (!window.monaco) {
      toast.error('Editor not loaded completely.', { autoClose: 1500 });
      return;
    }
    const models = window.monaco.editor.getModels();
    if (models && models.length > 0) {
      const activeCode = models[0].getValue();
      const activeLang = models[0].getLanguageId();
      const draftKey = `codearena_draft_${resolvedContestData?.contestId || 'default'}_${activeProblem.id}_${activeLang}`;
      localStorage.setItem(draftKey, activeCode);
      setIsDirty(false);
      toast.success('Draft saved!', {
        position: 'top-right',
        autoClose: 1500,
        className: 'bg-card border border-border text-foreground'
      });
    }
  };

  // Trigger Code Submission from parent component
  const triggerCodeSubmit = () => {
    const submitBtn = Array.from(document.querySelectorAll('button')).find(btn =>
      btn.textContent.includes('Submit') && !btn.textContent.includes('Submitting')
    );
    if (submitBtn) {
      submitBtn.click();
    } else {
      toast.error('Submit button not found or already running.', { autoClose: 1500 });
    }
  };

  // Keyboard Shortcuts Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        setactiveIndex(prev => Math.max(0, prev - 1));
        toast.info('Switched to Previous Problem', { autoClose: 1000 });
      }
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        setactiveIndex(prev => Math.min(ContestProblems.length - 1, prev + 1));
        toast.info('Switched to Next Problem', { autoClose: 1000 });
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraftManual();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        triggerCodeSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ContestProblems.length, activeIndex]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes in your code draft. Exit anyway?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Timer callbacks
  const handleTimerEnd = () => {
    toast.error('The contest has ended! All submissions are now virtual.', {
      position: 'top-center',
      autoClose: false
    });
  };

  const handleFifteenMinutesAlert = () => {
    toast.warn('⚠️ Only 15 minutes remaining in the contest! Wrap up and submit.', {
      position: 'top-center',
      autoClose: 10000,
      className: 'bg-red-500/10 border border-red-500/30 text-red-500 font-bold'
    });
  };

  // Helper: check problem solved or attempted status
  const getProblemStatus = useCallback((probId) => {
    const subs = problemSubmissions[probId] || [];
    if (subs.some(s => s.status === 'ACCEPTED')) return 'SOLVED';
    if (subs.length > 0) return 'ATTEMPTED';
    return 'UNSTARTED';
  }, [problemSubmissions]);

  // Progress stats calculation
  const solvedCount = useMemo(() => {
    return ContestProblems.filter(p => getProblemStatus(p.id) === 'SOLVED').length;
  }, [ContestProblems, getProblemStatus]);

  const totalScore = useMemo(() => {
    return ContestProblems.reduce((sum, p) => {
      if (getProblemStatus(p.id) === 'SOLVED') return sum + p.score;
      return sum;
    }, 0);
  }, [ContestProblems, getProblemStatus]);

  const wrongAttempts = useMemo(() => {
    let wrong = 0;
    Object.values(problemSubmissions).forEach(subs => {
      wrong += subs.filter(s => s.status !== 'ACCEPTED').length;
    });
    return wrong;
  }, [problemSubmissions]);

  // Simulated rank based on problems solved
  const computedRank = useMemo(() => {
    if (solvedCount === 0) return '#74';
    if (solvedCount === 1) return '#42';
    if (solvedCount === 2) return '#19';
    if (solvedCount === 3) return '#8';
    return '#3';
  }, [solvedCount]);

  // Quick problems list dropdown options
  const problemOptions = useMemo(() => {
    return ContestProblems.map((p) => {
      const status = getProblemStatus(p.id);
      return {
        ...p,
        statusIcon: status === 'SOLVED' ? '🟢' : status === 'ATTEMPTED' ? '🟡' : '⚪'
      };
    });
  }, [ContestProblems, getProblemStatus]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* 1. Sticky Contest Navbar */}
      <header className="sticky top-0 z-40 h-16 shrink-0 flex items-center justify-between px-4 md:px-6 bg-card border-b border-border shadow-xs">

        {/* Left Side: Brand & Contest Header */}
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md shadow-indigo-500/25 shrink-0">
              <Trophy size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-wider uppercase text-brand-gradient hidden sm:block">
              Code Arena
            </span>
          </Link>
          <div className="h-6 w-px bg-border hidden md:block" />
          <div className="flex flex-col min-w-0">
            <h1 className="text-xs md:text-sm font-bold line-clamp-1 max-w-[80px] sm:max-w-[180px] md:max-w-xs text-foreground">
              {resolvedContestData?.contestName || 'Ongoing Contest'}
            </h1>
            <div className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-500">Live Contest</span>
            </div>
          </div>
        </div>

        {/* Center: Live Timer Display */}
        <div className="flex items-center gap-2">
          <CountdownTimer
            startTime={resolvedContestData?.startTime || fallbackStartTime}
            durationHours={resolvedContestData?.duration || 2}
            onTimerEnd={handleTimerEnd}
            onFifteenMinutesRemaining={handleFifteenMinutesAlert}
          />
        </div>

        {/* Right Side: Stats & Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Theme Toggle Button */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs"
            title="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Quick Problem selector Dropdown */}
          <div className="hidden lg:block relative group">
            <button className="flex items-center gap-1.5 bg-card border border-border hover:border-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200">
              <List size={13} className="text-indigo-500 dark:text-indigo-400" />
              <span>Problem {activeProblem?.label}</span>
              <ChevronDown size={11} className="opacity-60" />
            </button>
            <div className="absolute right-0 mt-1.5 w-56 origin-top-right scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 bg-card border border-border rounded-2xl shadow-xl p-2 z-50">
              <div className="text-[9px] text-muted-foreground font-extrabold uppercase tracking-widest p-2 border-b border-border mb-1">
                Contest Problems
              </div>
              <div className="space-y-0.5">
                {problemOptions.map((opt, i) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setactiveIndex(i);
                      setActiveCenterTab('description');
                    }}
                    className={`w-full flex items-center justify-between text-left p-2 rounded-xl text-xs hover:bg-muted/80 transition-colors ${i === activeIndex ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-foreground'}`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-xs shrink-0">{opt.statusIcon} {opt.label}.</span>
                      <span className="truncate">{opt.title}</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground font-mono shrink-0">{opt.score} pts</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Trigger */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="hidden md:flex p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Keyboard Shortcuts Guide"
          >
            <Keyboard size={14} />
          </button>

          {/* Exit Button */}
          <button
            onClick={() => setIsExitConfirmOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-red-500/20 hover:border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 hover:text-red-700 transition-all cursor-pointer"
            title="Exit Contest"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Exit</span>
          </button>

          {/* User Profile */}
          {isJwtExist && userDetails && (
            <div className="flex items-center gap-2 border-l border-border pl-3 hidden sm:flex">
              <img
                src={userDetails.avatar || 'https://i.pravatar.cc/150'}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-border"
              />
              <span className="text-xs font-bold text-muted-foreground capitalize max-w-[80px] truncate">
                {username}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* 2. Problem Switcher Tab Bar */}
      <div className="bg-muted/40 border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {ContestProblems.map((prob, i) => {
            const isActive = i === activeIndex;
            const status = getProblemStatus(prob.id);

            let borderStyle = 'border-border';
            let bgStyle = 'bg-card hover:bg-muted/80 text-muted-foreground';
            let dotColor = 'bg-slate-400 dark:bg-slate-600';

            if (status === 'SOLVED') {
              borderStyle = isActive ? 'border-emerald-500 shadow-sm' : 'border-emerald-500/30';
              bgStyle = isActive ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400/90';
              dotColor = 'bg-emerald-500';
            } else if (status === 'ATTEMPTED') {
              borderStyle = isActive ? 'border-amber-500 shadow-sm' : 'border-amber-500/30';
              bgStyle = isActive ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300' : 'bg-amber-500/5 text-amber-600 dark:text-amber-400/90';
              dotColor = 'bg-amber-500';
            } else if (isActive) {
              borderStyle = 'border-indigo-500 shadow-sm';
              bgStyle = 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300';
              dotColor = 'bg-indigo-500 animate-pulse';
            }

            return (
              <button
                key={prob.id}
                onClick={() => {
                  setactiveIndex(i);
                  setActiveCenterTab('description');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${borderStyle} ${bgStyle} text-xs font-bold cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                <span className="font-mono">[{prob.label}]</span>
                <span>{prob.title}</span>
                {status === 'SOLVED' && <Check size={11} className="text-emerald-600 dark:text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* Mobile View Switcher (Tabs for Description vs Editor) */}
        <div className="flex border border-border rounded-xl p-0.5 bg-card lg:hidden shrink-0 ml-4">
          <button
            onClick={() => setActiveCenterTab('description')}
            className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${activeCenterTab === 'description' ? 'bg-indigo-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveCenterTab('editor')}
            className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${activeCenterTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Editor
          </button>
        </div>
      </div>

      {/* 3. 3-Column Layout */}
      <div className="flex-1 flex min-h-0 relative">

        {/* LEFT SIDEBAR (Collapsible): Progress Tracker & Details */}
        <AnimatePresence initial={false}>
          {leftSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="hidden lg:flex flex-col h-full bg-card border-r border-border overflow-y-auto shrink-0"
            >
              <div className="p-4 space-y-6">

                {/* Progress Tracker Card */}
                <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">My Progress</h2>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">{solvedCount} / {ContestProblems.length} Solved</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 font-bold">
                      <CircularProgressbar
                        value={(solvedCount / ContestProblems.length) * 100}
                        text={`${Math.round((solvedCount / ContestProblems.length) * 100)}%`}
                        styles={buildStyles({
                          textColor: 'currentColor',
                          pathColor: '#6366f1',
                          trailColor: resolvedTheme === 'dark' ? '#1e293b' : '#e2e8f0',
                          textSize: '24px'
                        })}
                      />
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between w-32">
                        <span>Score:</span>
                        <span className="font-bold text-amber-500 font-mono">{totalScore}</span>
                      </div>
                      <div className="flex justify-between w-32">
                        <span>Rank Estimate:</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{computedRank}</span>
                      </div>
                      <div className="flex justify-between w-32">
                        <span>Penalty:</span>
                        <span className="font-bold text-rose-500 font-mono">{wrongAttempts} errors</span>
                      </div>
                    </div>
                  </div>

                  {/* Linear progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-indigo-50 rounded-full transition-all duration-500"
                      style={{ width: `${(solvedCount / ContestProblems.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Contest Information (Clean & Simple) */}
                <div className="bg-muted/20 border border-border rounded-2xl p-4 space-y-3">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Info size={12} className="text-indigo-500" />
                    Contest Details
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {resolvedContestData?.contestDescription || 'Official Code Arena competitive programming contest. Solve the problem set. Points accumulate per task solved.'}
                  </p>
                  <div className="pt-2 space-y-1.5 text-[10px] font-semibold text-muted-foreground border-t border-border/60">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-foreground">{resolvedContestData?.duration || 2} Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prize Pool:</span>
                      <span className="text-orange-500 font-bold">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-emerald-500 font-bold">RUNNING</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* CENTER MAIN AREA: Resizable coding space (Problem Details & Editor) */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative">

          {/* Floating collapse handle button for Left Sidebar - Anchored at the left edge in the middle height */}
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-5 h-12 bg-card hover:bg-muted border border-l-0 border-border text-muted-foreground hover:text-foreground rounded-r-xl items-center justify-center cursor-pointer shadow-md transition-all duration-200"
            title={leftSidebarOpen ? 'Collapse Left Sidebar' : 'Expand Left Sidebar'}
          >
            {leftSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Floating collapse handle button for Right Sidebar - Anchored at the right edge in the middle height */}
          <button
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-5 h-12 bg-card border border-r-0 border-border text-muted-foreground hover:text-foreground rounded-l-xl items-center justify-center cursor-pointer shadow-md transition-all duration-200"
            title={rightSidebarOpen ? 'Collapse Right Sidebar' : 'Expand Right Sidebar'}
          >
            {rightSidebarOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Desktop Layout (Split-pane) */}
          <div className="hidden lg:flex flex-1 min-h-0 w-full bg-background">
            <ResizablePanels
              direction="horizontal"
              initialSize={48}
              minSize={25}
              maxSize={75}
              className="flex-1 h-full w-full"
            >

              {/* Left Pane (Description Tabs) */}
              <div className="flex flex-col h-full w-full bg-card overflow-hidden">
                {/* Header with Description / Submissions tabs only */}
                <div className="flex items-center justify-between border-b border-border bg-card px-3 min-h-10 shrink-0">
                  <div className="flex items-center gap-1 pl-4">
                    {[
                      { label: 'Description', icon: FileText },
                      { label: 'Submissions', icon: History }
                    ].map(tab => {
                      const isActive = currentTopBar === tab.label;
                      return (
                        <button
                          key={tab.label}
                          onClick={() => setcurrentTopBar(tab.label)}
                          className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold relative transition-colors cursor-pointer border-b-2 border-transparent ${isActive ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          <tab.icon size={13} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[10px] text-indigo-500 font-extrabold font-mono pr-6">
                    Score: {activeProblem?.score} pts
                  </div>
                </div>

                {/* Problem Statement Renderer */}
                <div className="flex-1 overflow-y-auto p-5 bg-card">
                  {loadingDetails ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <RefreshCw className="animate-spin text-indigo-500 w-6 h-6" />
                      <span className="text-muted-foreground text-[11px] font-semibold">Loading statement...</span>
                    </div>
                  ) : resolvedProblemDetails ? (
                    currentTopBar === 'Description' ? (
                      <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center justify-between border-b border-border/40 pb-2">
                          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                            <span className="font-mono text-muted-foreground">{activeProblem?.label}.</span>
                            {resolvedProblemDetails.title}
                          </h2>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${resolvedProblemDetails.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : resolvedProblemDetails.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'}`}>
                            {resolvedProblemDetails.difficulty}
                          </span>
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                          <Description
                            description={resolvedProblemDetails.description}
                            basicInfo={resolvedProblemDetails}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="animate-fade-in">
                        <Submission id={activeProblem.id} />
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <ShieldAlert size={30} className="opacity-30 mb-2" />
                      <span className="text-xs">Problem details failed to load.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Pane (Monaco Code Editor Panel) */}
              <div className={`flex flex-col h-full w-full ${resolvedTheme === 'dark' ? 'bg-[#131c31]' : 'bg-white'} overflow-hidden`}>
                {resolvedProblemDetails && (
                  <CodeEditor
                    codeTemplates={resolvedProblemDetails.templates}
                    contestId={resolvedContestData?.contestId || 'default'}
                    problemId={activeProblem.id}
                    problemMeta={resolvedProblemDetails}
                    testcaseData={testcaseData}
                    setcurrentTopBar={handleTabChange}
                    isContest={true}
                  />
                )}
              </div>

            </ResizablePanels>
          </div>

          {/* Mobile Layout (Tabs Selection) */}
          <div className="flex lg:hidden flex-1 min-h-0 w-full">
            {activeCenterTab === 'description' ? (
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-card">
                <div className="flex items-center justify-between border-b border-border bg-card px-3 min-h-10 shrink-0">
                  <div className="flex items-center gap-1">
                    {['Description', 'Submissions'].map(tab => {
                      const isActive = currentTopBar === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setcurrentTopBar(tab)}
                          className={`px-3 py-1.5 text-xs font-bold relative transition-colors border-b-2 border-transparent cursor-pointer ${isActive ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-card">
                  {loadingDetails ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <RefreshCw className="animate-spin text-indigo-500 w-6 h-6" />
                      <span className="text-muted-foreground text-xs">Loading task...</span>
                    </div>
                  ) : resolvedProblemDetails ? (
                    currentTopBar === 'Description' ? (
                      <Description
                        description={resolvedProblemDetails.description}
                        basicInfo={resolvedProblemDetails}
                      />
                    ) : (
                      <Submission id={activeProblem.id} />
                    )
                  ) : (
                    <div className="text-muted-foreground text-center py-10 text-xs">Problem details failed to render.</div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`flex-1 flex flex-col h-full ${resolvedTheme === 'dark' ? 'bg-[#131c31]' : 'bg-white'} overflow-hidden`}>
                {resolvedProblemDetails && (
                  <CodeEditor
                    codeTemplates={resolvedProblemDetails.templates}
                    contestId={resolvedContestData?.contestId || 'default'}
                    problemId={activeProblem.id}
                    problemMeta={resolvedProblemDetails}
                    testcaseData={testcaseData}
                    setcurrentTopBar={handleTabChange}
                    isContest={true}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR (Collapsible): Submissions Snapshot */}
        <AnimatePresence initial={false}>
          {rightSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 270, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="hidden lg:flex flex-col h-full bg-card border-l border-border overflow-y-auto shrink-0"
            >
              <div className="p-4 space-y-6">

                {/* Submission History Snapshot for the Active Problem */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">My Submissions</h3>
                    <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">Task {activeProblem?.label}</span>
                  </div>

                  <div className="bg-muted/20 border border-border rounded-2xl p-3 space-y-2 max-h-40 overflow-y-auto shadow-inner">
                    {(problemSubmissions[activeProblem?.id] || []).length === 0 ? (
                      <p className="text-[11px] text-muted-foreground italic text-center py-4">No submissions made yet.</p>
                    ) : (
                      (problemSubmissions[activeProblem.id] || []).slice(0, 5).map((sub, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] border-b border-border/40 pb-2 last:border-b-0 last:pb-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${sub.status === 'ACCEPTED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span className={`font-bold ${sub.status === 'ACCEPTED' ? 'text-emerald-500' : 'text-red-500'}`}>
                              {sub.status === 'ACCEPTED' ? 'Accepted' : 'Failed'}
                            </span>
                          </div>
                          <span className="text-slate-400 font-mono text-[9px]">{(sub.time || 0).toFixed(0)}ms</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Keyboard Shortcuts Compact Guide (Clean and Spacious) */}
                <div className="bg-muted/10 border border-border rounded-2xl p-4 space-y-3">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Keyboard size={12} className="text-indigo-500" />
                    Shortcuts
                  </h3>
                  <div className="space-y-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Prev Problem</span>
                      <Kbd className="bg-card text-foreground px-1 py-0.5 text-[9px]">Alt + ←</Kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Next Problem</span>
                      <Kbd className="bg-card text-foreground px-1 py-0.5 text-[9px]">Alt + →</Kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Submit Code</span>
                      <Kbd className="bg-card text-foreground px-1 py-0.5 text-[9px]">Ctrl + Enter</Kbd>
                    </div>
                  </div>
                </div>

                {/* Unsaved draft changes indicator */}
                {isDirty && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400">
                    <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-[11px]">Unsaved Draft Code</span>
                      <p className="text-[10px] text-muted-foreground leading-normal">
                        Type <Kbd className="bg-card text-foreground px-1 py-0.5 text-[9px]">Ctrl+S</Kbd> to save your draft.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Overlay Modal: Keyboard Shortcuts List */}
      <AnimatePresence>
        {isShortcutsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShortcutsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative bg-card border border-border rounded-3xl shadow-2xl max-w-sm w-full p-5 z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Keyboard className="text-indigo-500 w-5 h-5" />
                  <h2 className="text-sm font-bold">Keyboard Shortcuts</h2>
                </div>
                <button
                  onClick={() => setIsShortcutsOpen(false)}
                  className="p-1 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80">
                  <span className="text-foreground font-semibold">Previous Problem</span>
                  <Kbd className="bg-card text-foreground px-2 py-0.5 text-[10px]">Alt + ArrowLeft (←)</Kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80">
                  <span className="text-foreground font-semibold">Next Problem</span>
                  <Kbd className="bg-card text-foreground px-2 py-0.5 text-[10px]">Alt + ArrowRight (→)</Kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80">
                  <span className="text-foreground font-semibold">Submit Solution</span>
                  <Kbd className="bg-card text-foreground px-2 py-0.5 text-[10px]">Ctrl + Enter</Kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80">
                  <span className="text-foreground font-semibold">Save Draft Code</span>
                  <Kbd className="bg-card text-foreground px-2 py-0.5 text-[10px]">Ctrl + S</Kbd>
                </div>
              </div>

              <Button
                onClick={() => setIsShortcutsOpen(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 cursor-pointer font-bold text-xs"
              >
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Overlay Modal: Exit Contest Confirmation */}
      <AnimatePresence>
        {isExitConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExitConfirmOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative bg-card border border-border rounded-3xl shadow-2xl max-w-xs w-full p-5 z-10 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <ShieldAlert size={18} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-bold">Exit Contest Session?</h2>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    Exit the contest environment? Your active timer will continue to run in the background.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setIsExitConfirmOpen(false)}
                  className="flex-1 bg-card border border-border text-muted-foreground hover:text-foreground cursor-pointer hover:bg-muted rounded-xl py-2 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsDirty(false); // Clear dirty flag to allow navigation
                    setIsExitConfirmOpen(false);
                    navigate('/contest');
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white cursor-pointer font-bold rounded-xl py-2 text-xs"
                >
                  Exit Contest
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default OngoingContestPage;