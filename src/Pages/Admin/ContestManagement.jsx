import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  Trophy,
  X,
  Edit2,
  Trash2,
  AlertTriangle,
  Save
} from "lucide-react";
import axios from "axios";
import * as yup from "yup";
import { useAppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";

const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "details", label: "Details" },
    { id: "testcases", label: "Test Cases" },
    { id: "templates", label: "templates" },
    { id: "solution", label: "Solution" },
  ];

const ContestManagement = () => {
  const { allContest, showAllContest } = useAppContext();
  const [deleteTarget, setdeleteTarget] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [targetContestDelete, settargetContestDelete] = useState({
    contestId: "",
    contestName: "",
    countOfParticipants: 0,
  });
  const [targetContestAddProblem,setTargetContestAddProblem]= useState({
    contestId: "",
    contestName: "",
  })
  const [activeTab, setActiveTab] = useState("basic");
  
    const [editActiveTab, setEditActiveTab] = useState("basic");
  const [isAddMode, setIsAddMode] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingContestId, setEditingContestId] = useState(null);

  const [currentContest, setCurrentContest] = useState({
    contestName: "",
    contestDescription: "",
    startTime: "",
    duration: "",
    problemIds: [],
  });

  const initialValues = {
    contestName: "",
    contestDescription: "",
    startTime: "",
    duration: "",
    problemIds: [],
  };

  // console.log(allContest);

  const validationSchema = yup.object({
    contestName: yup.string().required("Contest Name is required"),
    contestDescription: yup
      .string()
      .required("Contest Description is required"),
    startTime: yup.string().required("Start time for contest is required"),
    duration: yup.string().required("Duration is required"),
  });

  const problemInitialValues = {
    sno: "",
    title: "",
    problemOrder:"",
    slug: "",
    topicTags: "",
    difficulty: "Easy",
    problemTopic: "",
    inputType: "",
    returnType: "",
    functionName: "",
    description: "",
    algorithmSteps: [""],
    timeComplexity: { value: "", explanation: "" },
    spaceComplexity: { value: "", explanation: "" },
    testCases: [{ input: "", output: "", explanation: "", hidden: false }],
    templates: {
      javascript: "",
      java: "",
      python: "",
      cpp: "",
    },
    solutions: {
      javascript: "",
      java: "",
      python: "",
      cpp: "",
    },
  };

  const problemValidationSchema = yup.object({
    sno: yup.number().typeError("S. No must be a number"),
    title: yup.string().required("Title is required"),
    problemOrder: yup.number().required("Problem Order is required"),
    slug: yup.string().required("Slug is required"),
    topicTags: yup.string().required("Tags are required"),
    difficulty: yup.string().required("Difficulty is required"),
    inputType: yup.string().required("Input Type is required"),
    returnType: yup.string().required("Return Type is required"),
    functionName: yup.string().required("Function name is required"),
    description: yup.string().required("Description is required"),
    timeComplexity: yup.object({
      value: yup.string().required("Time complexity value is required"),
      explanation: yup.string().required("Explanation is required"),
    }),
    spaceComplexity: yup.object({
      value: yup.string().required("Space complexity value is required"),
      explanation: yup.string().required("Explanation is required"),
    }),
    testCases: yup.array().of(
      yup.object({
        input: yup.string().required("Input is required"),
        output: yup.string().required("Output is required"),
        explanation: yup.string(),
      })
    ).min(1, "At least one test case is required"),
    templates: yup.object({
      javascript: yup.string().required("templates is required"),
      java: yup.string().required("templates is required"),
      python: yup.string().required("templates is required"),
      cpp: yup.string().required("templates is required"),
    }),
    solutions: yup.object({
      javascript: yup.string().required("Solution is required"),
      java: yup.string().required("Solution is required"),
      python: yup.string().required("Solution is required"),
      cpp: yup.string().required("Solution is required"),
    }),
  });

  // console.log(isAdmin)
  const [activeMenuContestName, setActiveMenuContestName] = useState(null);
  const menuRef = useRef(null);
  const { jwtToken } = useAppContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [errors, setErrors] = useState({});
  const [contestProblems, setContestProblems] = useState([]);

  const fetchContestProblems = async (contestId) => {
    if (!contestId) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/contestProblem/fetchContestProblemForEditor/${contestId}`,{
        headers:{
          'Authorization':`Bearer ${jwtToken}`
        }
      });
      setContestProblems(res.data);
      console.table("Contest Problems:", res.data);
    } catch (e) {
      console.error("Failed to fetch contest problems:", e);
    }
  };

  const startEditingProblem = (problem) => {
    setEditingProblem({
      sno: problem.sno || "",
      title: problem.title || "",
      problemOrder: problem.problemOrder || "",
      slug: problem.slug || "",
      topicTags: problem.topicTags || "",
      difficulty: problem.difficulty || "Easy",
      problemTopic: problem.problemTopic || "",
      inputType: problem.inputType || "",
      returnType: problem.returnType || "",
      functionName: problem.functionName || "",
      description: problem.description || "",
      algorithmSteps: problem.algorithmSteps || [""],
      timeComplexity: problem.timeComplexity || { value: "", explanation: "" },
      spaceComplexity: problem.spaceComplexity || { value: "", explanation: "" },
      testCases: problem.testCases || [{ input: "", output: "", explanation: "", hidden: false }],
      templates: problem.templates || {
        javascript: "",
        java: "",
        python: "",
        cpp: "",
      },
      solutions: problem.solutions || {
        javascript: "",
        java: "",
        python: "",
        cpp: "",
      },
    });
  };

  const handleUpdateProblem = async (values, { resetForm }) => {
    console.log("here in update problem");
    try {
      console.log("Update Form Values:", values);
      // Dummy update logic - e.g., toast success
      toast.success("Problem Updated Successfully (Dummy)");
      setEditingProblem(null);
      resetForm();
    } catch (e) {
      toast.error("Failed to update problem");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuContestName(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditClick = (contest) => {
    setModalMode("edit");
    setEditingContestId(contest.contestId);
    setCurrentContest({
      contestName: contest.contestName,
      contestDescription: contest.contestDescription,
      startTime: contest.startTime,
      duration: contest.duration,
      problemIds: contest.problemIds || [],
    });
    fetchContestProblems(contest.contestId);
    setIsModalOpen(true);
    setActiveMenuContestName(null);
  };

  const handleCreateClick = () => {
    setModalMode("create");
    setEditingContestId(null);
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    setModalMode("create");
    setEditingContestId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalMode == "create") {
      // console.log("here in create mode");
      try {
        await validationSchema.validate(currentContest, { abortEarly: false });
        // console.log("Submitting contest:", currentContest);
        setErrors({});

        const res = await axios.post(
          `${BACKEND_URL}/admin/createContest`,
          currentContest,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );

        const result = res.data;
        if (result.status == 1) {
          toast.success(`Contest saved...`);
          setIsModalOpen(false);
          showAllContest();
          setCurrentContest(initialValues);
        } else {
          throw new Error();
        }
      } catch (e) {
        if (e.name === "ValidationError") {
          const validationErrors = {};
          e.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
        } else {
          console.log(e);
          toast.error("Contest not added");
          setCurrentContest(initialValues);
        }
      }
    } else if (modalMode == "edit") {
      // console.log("here in edit mode");
      // console.log(currentContest);
      // console.log(editingContestId);
      try {
        const result = await axios.put(
          `${BACKEND_URL}/admin/contest/update/${editingContestId}`,
          currentContest,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );
        if (result.data.status == 1) {
          toast.success(`Contest Details changes saved...`);
          setIsModalOpen(false);
          setModalMode("");
          setCurrentContest({
            contestName: "",
            contestDescription: "",
            startTime: "",
            duration: "",
          });
          setEditingContestId(null);
          showAllContest();
        } else {
          throw new Error();
        }
      } catch (e) {
        toast.error(`Contest not updated`);
      }
    }
  };

  // console.log(allContest);

  const handleAddProblem = async (values, { resetForm }) => {
      console.log("here");
      try {
        values.sno = parseInt(values.sno);
        console.log("Form Values:", values);
        // console.log("Jwt is : ",jwtToken);
        const result = await axios.post(`${BACKEND_URL}/contestProblem/${targetContestAddProblem.contestId}/problem`, values, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        // console.log("API Response:", result.data);
        if (result.data.status == 1) {
          setIsAddMode(false);
          toast.success("New Problem Added");
          resetForm();
          fetchContestProblems(targetContestAddProblem.contestId);
        } else {
          throw new Error();
        }
      } catch (e) {
        toast.error("Failed to add problem");
      }
    };

  const deleteContestToSpringboot = async () => {
    const result = await axios.delete(
      `${BACKEND_URL}/admin/deleteContestByContestId/${targetContestDelete.contestId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
    return result.data;
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    // console.log("here");

    try {
      const res = await deleteContestToSpringboot();
      if (res.status == 1) {
        settargetContestDelete({
          contestId: "",
          contestName: "",
          countOfParticipants: 0,
        });
        setdeleteTarget(false);
        toast.success("Contest deleted successfully...");
        showAllContest();
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error("Contest not deleted");
    }
    setDeleteConfirmText("");
  };

  const handleDeleteClick = (contest) => {
    // setContests(contests.filter((c) => c.contestName !== name));
    setdeleteTarget(true);
    settargetContestDelete({
      ...targetContestDelete,
      contestName: contest.contestName,
      contestId: contest.contestId,
      countOfParticipants: contest.registeredUsers.length,
    });
    setActiveMenuContestName(null);
  };

  // console.log(targetContestDelete);

  const toggleMenu = (name, e) => {
    e.stopPropagation();
    setActiveMenuContestName(activeMenuContestName === name ? null : name);
  };

  return (
    <>
      <ToastContainer />
      <div className="space-y-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">
              Contest Management
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-2">
              Schedule and manage coding contests.
            </p>
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm shadow-purple-200/50 dark:shadow-purple-900/30"
          >
            <Plus size={20} />
            <span>Create Contest</span>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allContest?.map((contest) => (
            <div
              key={contest.contestName}
              className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-md dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-shadow overflow-visible relative group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-50 dark:bg-purple-500/15 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
                    <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${contest.contestStatus === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : contest.contestStatus === "Completed"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {contest.contestStatus}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
                  {contest.contestName}
                </h3>

                <div className="space-y-2 text-sm text-gray-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400 dark:text-slate-500" />
                    <span>{new Date(contest.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400 dark:text-slate-500" />
                    <span>{contest.duration} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400 dark:text-slate-500" />
                    <span>
                      {contest.registeredUsers.length > 0
                        ? contest.registeredUsers.length
                        : 0}{" "}
                      Participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-slate-700/50 flex justify-between items-center relative">
                <button
                  onClick={() => handleEditClick(contest)}
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Edit Details
                </button>
                <div className="relative">
                  <button
                    onClick={(e) => toggleMenu(contest.contestName, e)}
                    className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {activeMenuContestName === contest.contestName && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl dark:shadow-black/40 border border-gray-100 dark:border-slate-700 z-10 overflow-hidden animate-in fade-in zoom-in duration-200"
                    >
                      <button
                        onClick={() => {
                          setTargetContestAddProblem({
                            contestId: contest.contestId,
                            contestName: contest.contestName,
                          });
                          fetchContestProblems(contest.contestId);
                          setIsAddMode(true);
                          setActiveMenuContestName(null);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-700 dark:hover:text-purple-400 flex items-center gap-2 transition-colors"
                      >
                        <Plus size={16} />
                        Add Problem
                      </button>
                      <button
                        onClick={() => handleEditClick(contest)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-700 dark:hover:text-purple-400 flex items-center gap-2 transition-colors"
                      >
                        <Edit2 size={16} />
                        Modify
                      </button>
                      <button
                        onClick={() => handleDeleteClick(contest)}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors border-t border-gray-50 dark:border-slate-700"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl dark:shadow-black/40 transform transition-all scale-100">
              <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50">
                  {modalMode === "create"
                    ? "Create New Contest"
                    : "Modify Contest"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentContest({
                      contestName: "",
                      contestDescription: "",
                      startTime: "",
                      duration: "",
                    });
                  }}
                  className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="p-6 space-y-4">
                {/* CONTEST NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    Contest Name
                  </label>
                  <input
                    type="text"
                    value={currentContest.contestName}
                    onChange={(e) =>
                      setCurrentContest({
                        ...currentContest,
                        contestName: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${errors.contestName ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                      }`}
                    placeholder="Enter contest name"
                  />
                  {errors.contestName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contestName}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={currentContest.contestDescription}
                    onChange={(e) =>
                      setCurrentContest({
                        ...currentContest,
                        contestDescription: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${errors.contestDescription
                        ? "border-red-500"
                        : "border-gray-300 dark:border-slate-600"
                      }`}
                    placeholder="Enter contest description"
                  />
                  {errors.contestDescription && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contestDescription}
                    </p>
                  )}
                </div>

                {/* START TIME & DURATION */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={currentContest.startTime}
                      onChange={(e) =>
                        setCurrentContest({
                          ...currentContest,
                          startTime: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${errors.startTime ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                        }`}
                    />
                    {errors.startTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.startTime}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (in minutes)
                    </label>
                    <input
                      type="number"
                      value={currentContest.duration}
                      onChange={(e) =>
                        setCurrentContest({
                          ...currentContest,
                          duration: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${errors.duration ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                        }`}
                      placeholder="e.g. 90"
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.duration}
                      </p>
                    )}
                  </div>
                </div>

                {modalMode === "edit" && (
                  <div className="pt-4 border-t border-gray-100 dark:border-slate-700/50">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-200 mb-3">
                      Associated Problems
                    </h3>
                    {contestProblems.length === 0 ? (
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        No problems associated with this contest.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {contestProblems.map((problem, idx) => (
                          <div 
                            key={problem.id || idx} 
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700/50 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-gray-400 font-mono">
                                #{problem.problemOrder || idx + 1}
                              </span>
                              <div>
                                <h4 className="text-sm font-medium text-gray-800 dark:text-slate-200">
                                  {problem.title}
                                </h4>
                                <p className="text-[11px] text-gray-400 dark:text-slate-500">
                                  {problem.slug}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span 
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  problem.difficulty?.toLowerCase() === "easy"
                                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                    : problem.difficulty?.toLowerCase() === "medium"
                                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                }`}
                              >
                                {problem.difficulty || "Easy"}
                              </span>
                              <button
                                type="button"
                                onClick={() => startEditingProblem(problem)}
                                className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-500/20 rounded-lg transition-colors cursor-pointer animate-in fade-in zoom-in duration-200"
                                title="Edit Problem"
                              >
                                <Edit2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* BUTTONS */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setErrors({});
                      setCurrentContest({
                        contestName: "",
                        contestDescription: "",
                        startTime: "",
                        duration: "",
                      });
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-slate-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-lg shadow-purple-600/20 transition-all"
                  >
                    {modalMode === "create" ? "Create Contest" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <AnimatePresence>
                  {(isAddMode || editingProblem) && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                          <h2 className="text-2xl font-bold text-gray-800">
                            {editingProblem ? "Edit Problem" : "Add New Problem"}
                          </h2>
                          <button
                            onClick={() => {
                              setIsAddMode(false);
                              setEditingProblem(null);
                            }}
                            className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-gray-700 shadow-sm"
                          >
                            <X size={24} />
                          </button>
                        </div>
        
                        <Formik
                          initialValues={editingProblem || problemInitialValues}
                          validationSchema={problemValidationSchema}
                          onSubmit={editingProblem ? handleUpdateProblem : handleAddProblem}
                          enableReinitialize
                        >
                          {({ values }) => (
                            <Form className="flex flex-col flex-1 overflow-hidden">
                              {/* Persistent Title Field */}
                              <div className="p-4 sm:p-6 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormGroup
                                    label="S. No"
                                    name="sno"
                                    placeholder="Enter problem number"
                                  />
        
                                  <FormGroup
                                    label="Problem Title"
                                    name="title"
                                    placeholder="Enter problem title"
                                  />
                                  <FormGroup
                                    label="Problem Order"
                                    name="problemOrder"
                                    placeholder="Enter Problem order"
                                  />
                                </div>
                              </div>
        
                              {/* Tabs */}
                              <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
                                {tabs.map((tab) => (
                                  <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-4 cursor-pointer text-sm font-medium transition-colors relative ${activeTab === tab.id
                                        ? "text-blue-600 bg-blue-50/50"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                      }`}
                                  >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                      <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                      />
                                    )}
                                  </button>
                                ))}
                              </div>
        
                              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                                {/* Basic Info Tab */}
                                {activeTab === "basic" && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormGroup
                                        label="Slug"
                                        name="slug"
                                        placeholder="e.g., two-sum"
                                      />
                                      <FormGroup
                                        label="Tags"
                                        name="topicTags"
                                        placeholder="e.g., Array, Hash Table"
                                      />
        
                                      <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                          Difficulty
                                        </label>
                                        <Field
                                          as="select"
                                          name="difficulty"
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        >
                                          <option value="Easy">Easy</option>
                                          <option value="Medium">Medium</option>
                                          <option value="Hard">Hard</option>
                                        </Field>
                                      </div>
        
                                      {/* <FormGroup
                                        label="Problem Topic"
                                        name="problemTopic"
                                        placeholder="e.g., Algorithms"
                                      /> */}
                                      <FormGroup
                                        label="Function Name"
                                        name="functionName"
                                        placeholder="e.g., twoSum"
                                      />
                                      <FormGroup
                                        label="Input Type"
                                        name="inputType"
                                        placeholder="e.g., nums: int[], target: int"
                                      />
                                      <FormGroup
                                        label="Return Type"
                                        name="returnType"
                                        placeholder="e.g., int[]"
                                      />
                                    </div>
                                  </div>
                                )}
        
                                {/* Details Tab */}
                                {activeTab === "details" && (
                                  <div className="space-y-6">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Description
                                      </label>
                                      <Field
                                        as="textarea"
                                        name="description"
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                        placeholder="Detailed problem description..."
                                      />
                                      <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>
                                  </div>
                                )}
        
                                {/* Test Cases Tab */}
                                {activeTab === "testcases" && (
                                  <div className="space-y-6">
                                    <FieldArray name="testCases">
                                      {({ push, remove }) => (
                                        <div className="space-y-6">
                                          {values.testCases.map((_, index) => (
                                            <div
                                              key={index}
                                              className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm relative group"
                                            >
                                              <div className="absolute top-4 right-4">
                                                <button
                                                  type="button"
                                                  onClick={() => remove(index)}
                                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                                  title="Remove Test Case"
                                                >
                                                  <Trash2 size={18} />
                                                </button>
                                              </div>
                                              <h4 className="font-medium text-gray-900 mb-4">
                                                Test Case #{index + 1}
                                              </h4>
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                  <FormGroup
                                                    label="Input"
                                                    name={`testCases.${index}.input`}
                                                    placeholder="Input values..."
                                                  />
                                                </div>
                                                <FormGroup
                                                  label="Expected Output"
                                                  name={`testCases.${index}.output`}
                                                  placeholder="Expected result..."
                                                />
                                                <FormGroup
                                                  label="Explanation"
                                                  name={`testCases.${index}.explanation`}
                                                  placeholder="Why this output?"
                                                />
                                                <div className="flex items-center gap-2 mt-2">
                                                  <Field
                                                    type="checkbox"
                                                    name={`testCases.${index}.hidden`}
                                                    id={`hidden-${index}`}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                  />
                                                  <label
                                                    htmlFor={`hidden-${index}`}
                                                    className="text-sm text-gray-700"
                                                  >
                                                    Hidden Test Case
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                          <button
                                            type="button"
                                            onClick={() =>
                                              push({
                                                input: "",
                                                output: "",
                                                explanation: "",
                                                hidden: false,
                                              })
                                            }
                                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all font-medium flex items-center justify-center gap-2"
                                          >
                                            <Plus size={20} /> Add Test Case
                                          </button>
                                        </div>
                                      )}
                                    </FieldArray>
                                  </div>
                                )}
        
                                {/* templates Tab */}
                                {activeTab === "templates" && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                      {["javascript", "java", "python", "cpp"].map(
                                        (lang) => (
                                          <div key={lang} className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                              {lang} templates
                                            </label>
                                            <Field
                                              as="textarea"
                                              name={`templates.${lang}`}
                                              rows={6}
                                              className="w-full px-4 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
                                              placeholder={`Paste your ${lang} templates here...`}
                                            />
                                            <ErrorMessage
                                              name={`templates.${lang}`}
                                              component="div"
                                              className="text-red-500 text-sm"
                                            />
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}
        
                                {/* Solution Tab */}
                                {activeTab === "solution" && (
                                  <div className="flex gap-3 justify-center flex-col">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Algorithm Steps
                                      </label>
                                      <FieldArray name="algorithmSteps">
                                        {({ push, remove }) => (
                                          <div className="space-y-3">
                                            {values.algorithmSteps.map(
                                              (step, index) => (
                                                <div key={index} className="flex gap-2">
                                                  <Field
                                                    name={`algorithmSteps.${index}`}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder={`Step ${index + 1}`}
                                                  />
                                                  <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                  >
                                                    <Trash2 size={18} />
                                                  </button>
                                                </div>
                                              ),
                                            )}
                                            <button
                                              type="button"
                                              onClick={() => push("")}
                                              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                            >
                                              <Plus size={16} /> Add Step
                                            </button>
                                          </div>
                                        )}
                                      </FieldArray>
                                    </div>
        
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-4 p-4 bg-white rounded-xl border border-gray-200">
                                        <h3 className="font-semibold text-gray-900">
                                          Time Complexity
                                        </h3>
                                        <FormGroup
                                          label="Value"
                                          name="timeComplexity.value"
                                          placeholder="e.g., O(n)"
                                        />
                                        <FormGroup
                                          label="Explanation"
                                          name="timeComplexity.explanation"
                                          placeholder="Brief explanation..."
                                        />
                                      </div>
                                      <div className="space-y-4 p-4 bg-white rounded-xl border border-gray-200">
                                        <h3 className="font-semibold text-gray-900">
                                          Space Complexity
                                        </h3>
                                        <FormGroup
                                          label="Value"
                                          name="spaceComplexity.value"
                                          placeholder="e.g., O(1)"
                                        />
                                        <FormGroup
                                          label="Explanation"
                                          name="spaceComplexity.explanation"
                                          placeholder="Brief explanation..."
                                        />
                                      </div>
                                    </div>
        
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-1 gap-6">
                                        {["javascript", "java", "python", "cpp"].map(
                                          (lang) => (
                                            <div key={lang} className="space-y-2">
                                              <label className="block text-sm font-medium text-gray-700 capitalize">
                                                {lang} Solution
                                              </label>
                                              <Field
                                                as="textarea"
                                                name={`solutions.${lang}`}
                                                rows={6}
                                                className="w-full px-4 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
                                                placeholder={`Paste your ${lang} solution here...`}
                                              />
                                              <ErrorMessage
                                                name={`solutions.${lang}`}
                                                component="div"
                                                className="text-red-500 text-sm"
                                              />
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
        
                              {/* Footer Actions */}
                              <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3 sticky bottom-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsAddMode(false);
                                    setEditingProblem(null);
                                  }}
                                  className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                                >
                                  <Save size={18} />
                                  {editingProblem ? "Update Problem" : "Save Problem"}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
        <AnimatePresence>
          {deleteTarget && (
            <motion.div
              key="delete-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={
                (e) => e.target === e.currentTarget
                //  && cancelDelete()
              }
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 320, damping: 25 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-black/40 w-full max-w-md overflow-hidden"
              >
                {/* Header */}
                <div className="bg-red-50 dark:bg-red-500/10 border-b border-red-100 dark:border-red-500/20 px-6 py-5 flex items-start gap-4">
                  <div className="p-2.5 bg-red-100 dark:bg-red-500/20 rounded-xl shrink-0">
                    <AlertTriangle size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-slate-50">
                      Delete Contest
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                      This action is permanent and cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setdeleteTarget({
                        contestName: "",
                        contestDescription: "",
                        startTime: "",
                        duration: "",
                      });
                      setDeleteConfirmText("");
                      setdeleteTarget(false);
                    }}
                    className="p-1.5 rounded-lg cursor-pointer text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 space-y-5">
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                    You are about to permanently delete{" "}
                    <span className="font-semibold text-gray-900 dark:text-slate-100">
                      "{targetContestDelete.contestName}"
                    </span>
                    . All ranking, solutions, and submissions will be lost
                    forever.
                  </p>

                  {/* Problem preview card */}
                  <div className="bg-gray-50 dark:bg-slate-700/40 border border-gray-200 dark:border-slate-600 rounded-xl p-4 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Contest
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">
                        {targetContestDelete.contestName}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      · Registered Users:{" "}
                      {targetContestDelete.countOfParticipants}
                    </p>
                  </div>

                  {/* Name confirmation input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                      Type the contest name to confirm:
                    </label>
                    <div className="text-xs text-gray-500 dark:text-slate-400 font-mono bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 select-all">
                      {targetContestDelete.contestName}
                    </div>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter"}
                      placeholder="Type the Contest name exactly..."
                      autoFocus
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${deleteConfirmText.length > 0
                          ? deleteConfirmText.toLowerCase().trim() ===
                            targetContestDelete.contestName.toLowerCase()
                            ? "border-green-400 ring-2 ring-green-100 bg-green-50"
                            : "border-red-300 ring-2 ring-red-100"
                          : "border-gray-300 focus:ring-2 focus:ring-red-300 focus:border-red-400"
                        }`}
                    />
                    {deleteConfirmText.length > 0 &&
                      deleteConfirmText.toLowerCase().trim() !==
                      targetContestDelete.contestName.toLowerCase() && (
                        <p className="text-xs text-red-500">
                          Name doesn't match. Please type it exactly.
                        </p>
                      )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setdeleteTarget({
                        contestName: "",
                        contestDescription: "",
                        startTime: "",
                        duration: "",
                      });
                      setDeleteConfirmText("");
                      setdeleteTarget(false);
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-slate-300 border border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={
                      deleteConfirmText.toLowerCase().trim() !==
                      targetContestDelete.contestName.toLowerCase()
                    }
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${deleteConfirmText.toLowerCase().trim() ===
                        targetContestDelete.contestName.toLowerCase()
                        ? "bg-red-600 cursor-pointer hover:bg-red-700 text-white shadow-sm"
                        : "bg-red-200 text-red-400 cursor-not-allowed"
                      }`}
                  >
                    <Trash2 size={14} />
                    Delete Contest
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
// Helper component for standard form fields
const FormGroup = ({ label, name, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);
export default ContestManagement;
