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
} from "lucide-react";
import axios from "axios";
import * as yup from "yup";
import { useAppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const ContestManagement = () => {
  const { allContest, showAllContest } = useAppContext();
  const [deleteTarget, setdeleteTarget] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [targetContestDelete, settargetContestDelete] = useState({
    contestId: "",
    contestName: "",
    countOfParticipants: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingContestName, setEditingContestName] = useState(null);

  const [currentContest, setCurrentContest] = useState({
    contestName: "",
    contestDescription: "",
    startTime: "",
    duration: "",
  });

  const initialValues = {
    contestName: "",
    contestDescription: "",
    startTime: "",
    duration: "",
  };

  console.log(allContest);

  const validationSchema = yup.object({
    contestName: yup.string().required("Contest Name is required"),
    contestDescription: yup
      .string()
      .required("Contest Description is required"),
    startTime: yup.string().required("Start time for contest is required"),
    duration: yup.string().required("Duration is required"),
  });

  // console.log(isAdmin)
  const [activeMenuContestName, setActiveMenuContestName] = useState(null);
  const menuRef = useRef(null);
  const { jwtToken } = useAppContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [errors, setErrors] = useState({});

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
    setEditingContestName(contest.contestName);
    setCurrentContest({
      contestName: contest.contestName,
      contestDescription: contest.contestDescription,
      startTime: contest.startTime,
      duration: contest.duration,
    });
    setIsModalOpen(true);
    setActiveMenuContestName(null);
  };

  const handleCreateClick = () => {
    setModalMode("create");
    setEditingContestName(null);
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    setModalMode("create");
    setEditingContestName(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(currentContest, { abortEarly: false });
      console.log("Submitting contest:", currentContest);
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

  console.log(targetContestDelete);

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
            <h1 className="text-3xl font-bold text-gray-900">
              Contest Management
            </h1>
            <p className="text-gray-500 mt-2">
              Schedule and manage coding contests.
            </p>
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={20} />
            <span>Create Contest</span>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allContest?.map((contest) => (
            <div
              key={contest.contestName}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-visible relative group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      contest.status === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : contest.status === "Completed"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {contest.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {contest.contestName}
                </h3>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(contest.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{contest.duration} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>
                      {contest.registeredUsers.length > 0
                        ? contest.registeredUsers.length
                        : 0}{" "}
                      Participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center relative">
                <button
                  onClick={() => handleEditClick(contest)}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Edit Details
                </button>
                <div className="relative">
                  <button
                    onClick={(e) => toggleMenu(contest.contestName, e)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {activeMenuContestName === contest.contestName && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in duration-200"
                    >
                      <button
                        onClick={() => handleEditClick(contest)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors"
                      >
                        <Edit2 size={16} />
                        Modify
                      </button>
                      <button
                        onClick={() => handleDeleteClick(contest)}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-gray-50"
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
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalMode === "create"
                    ? "Create New Contest"
                    : "Modify Contest"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="p-6 space-y-4">
                {/* CONTEST NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
                      errors.contestName ? "border-red-500" : "border-gray-300"
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
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none ${
                      errors.contestDescription
                        ? "border-red-500"
                        : "border-gray-300"
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
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
                        errors.startTime ? "border-red-500" : "border-gray-300"
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
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
                        errors.duration ? "border-red-500" : "border-gray-300"
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

                {/* BUTTONS */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setErrors({});
                    }}
                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                {/* Header */}
                <div className="bg-red-50 border-b border-red-100 px-6 py-5 flex items-start gap-4">
                  <div className="p-2.5 bg-red-100 rounded-xl shrink-0">
                    <AlertTriangle size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      Delete Contest
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
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
                    className="p-1.5 rounded-lg cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 space-y-5">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You are about to permanently delete{" "}
                    <span className="font-semibold text-gray-900">
                      "{targetContestDelete.contestName}"
                    </span>
                    . All ranking, solutions, and submissions will be lost
                    forever.
                  </p>

                  {/* Problem preview card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Contest
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800 truncate">
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
                    <label className="text-sm font-medium text-gray-700">
                      Type the contest name to confirm:
                    </label>
                    <div className="text-xs text-gray-500 font-mono bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 select-all">
                      {targetContestDelete.contestName}
                    </div>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter"}
                      placeholder="Type the Contest name exactly..."
                      autoFocus
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${
                        deleteConfirmText.length > 0
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
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors  cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={
                      deleteConfirmText.toLowerCase().trim() !==
                      targetContestDelete.contestName.toLowerCase()
                    }
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      deleteConfirmText.toLowerCase().trim() ===
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

export default ContestManagement;
