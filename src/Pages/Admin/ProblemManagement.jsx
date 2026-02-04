import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Code,
  CheckCircle,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import {Form,Field,Formik} from "formik";

const ProblemManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [formId,setFormId] = useState(1); 

  const validateSchema = yup.object({
    "title": yup.string().required(`**problem title is required`),
    "description": yup
      .string()
      .required(`**problem description is required`),
    "difficulty": yup
      .string()
      .required(`**problem difficulty is needed`),
    "topics" : yup.string().required(`**topic tags are required`),
    "function name" : yup.string().required("**function name is required")
  });

  const handleAddProblem = async (values, helper) => {
    try {
      const result = await addProblemToSpringBoot(values);
      if (result.status === 1) {
        helper.resetForm();
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error(`Problem not added`);
    } finally {
    }
  };

  const addProblemToSpringBoot = async (values) => {
    return null;
  };

  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      acceptance: "48%",
      status: "Published",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      category: "Linked List",
      acceptance: "32%",
      status: "Published",
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      category: "Arrays",
      acceptance: "28%",
      status: "Draft",
    },
    {
      id: 4,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "Strings",
      acceptance: "31%",
      status: "Published",
    },
    {
      id: 5,
      title: "Zigzag Conversion",
      difficulty: "Medium",
      category: "Strings",
      acceptance: "42%",
      status: "Published",
    },
  ]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      setProblems(problems.filter((p) => p.id !== id));
    }
  };

  const difficultyColor = (diff) => {
    switch (diff) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6 h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Problem Management
          </h1>
          <p className="text-gray-500 mt-2">
            Create and manage coding problems.
          </p>
        </div>
        <button
          onClick={() => setIsAddMode(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <button onClick={handleAddProblem}>Add Problem</button>
        </button>
      </div>

      {/* yup form */}
      {isAddMode && (
        <div className="bg-green-400 w-1/2 flex flex-col gap-3 h-auto rounded-2xl p-3">
          <div className="w-full bg-pink-400  h-[60%] flex justify-around">
            <button onClick={()=>setFormId(1)} className="hover:bg-green-100">Basic info</button>
            <button onClick={()=>setFormId(2)} className="hover:bg-green-200">Detail</button>
            <button onClick={()=>setFormId(3)} className="hover:bg-green-300">Testcases</button>
            <button onClick={()=>setFormId(4)} className="hover:bg-green-400">solution</button>
          </div>
          {formId==1 && <p className="bg-red-100 rounded-2xl p-3">form 1 for basic data</p>}
          {formId==2 && <p className="bg-red-100 rounded-2xl p-3">form 2 for detailed</p>}
          {formId==3 && <p className="bg-red-100 rounded-2xl p-3">form 3 for testcases input</p>}
          {formId==4 && <p className="bg-red-100 rounded-2xl p-3">form 4 for adding solution/editorial</p>}
          <button onClick={()=>setIsAddMode(false)} className=" bg-orange-300 rounded-md hover:bg-orange-500 duration-300 ease-in-out text-white px-2 py-1">Close</button>
        </div>
      )}

      <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option>All Difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option>All Categories</option>
          <option>Arrays</option>
          <option>Strings</option>
          <option>Linked List</option>
          <option>Trees</option>
        </select>
      </div>

      {/* Problems List */}
      <div className="grid gap-4">
        {problems.map((problem) => (
          <motion.div
            key={problem.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Code className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {problem.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    {problem.category}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    Acceptance: {problem.acceptance}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  problem.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {problem.status === "Published" ? (
                  <CheckCircle size={14} />
                ) : (
                  <XCircle size={14} />
                )}
                {problem.status}
              </div>
              <div className="flex gap-2 border-l pl-4 border-gray-200">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(problem.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProblemManagement;
