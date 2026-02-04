import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Code,
  CheckCircle,
  XCircle,
  X,
  Save,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";

const ProblemManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Initial values for the form
  const initialValues = {
    title: "",
    slug: "",
    tags: "",
    difficulty: "Easy",
    problemTopic: "",
    inputType: "",
    returnType: "",
    functionName: "",
    description: "",
    algorithmSteps: [""],
    timeComplexity: { value: "", explanation: "" },
    spaceComplexity: { value: "", explanation: "" },
    testCases: [{ input: "", expected: "", explanation: "", hidden: false }],
    solution: {
      javascript: "",
      java: "",
      python: "",
      cpp: ""
    }
  };

  // Validation Schema
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    slug: yup.string().required("Slug is required"),
    functionName: yup.string().required("Function name is required"),
    description: yup.string().required("Description is required"),
    // Add more validation as needed
  });

  const handleAddProblem = async (values, { resetForm }) => {
    try {
      console.log("Form Values:", values);
      toast.success("Problem added successfully! (Check console for data)");
      setIsAddMode(false);
      resetForm();
    } catch (e) {
      toast.error("Failed to add problem");
    }
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
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Strings",
      acceptance: "52%",
      status: "Published",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      category: "Arrays",
      acceptance: "36%",
      status: "Draft",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      setProblems(problems.filter((p) => p.id !== id));
    }
  };

  const difficultyColor = (diff) => {
    switch (diff) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "details", label: "Details" },
    { id: "testcases", label: "Test Cases" },
    { id: "solution", label: "Solution" },
  ];

  return (
    <div className="space-y-6 min-h-screen relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Problem Management</h1>
          <p className="text-gray-500 mt-2">Create and manage coding problems.</p>
        </div>
        <button
          onClick={() => setIsAddMode(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={20} />
          <span>Add Problem</span>
        </button>
      </div>

      <AnimatePresence>
        {isAddMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800">Add New Problem</h2>
                <button
                  onClick={() => setIsAddMode(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-gray-700 shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleAddProblem}
              >
                {({ values }) => (
                  <Form className="flex flex-col flex-1 overflow-hidden">
                    {/* Persistent Title Field */}
                    <div className="p-6 pb-0 bg-white">
                      <FormGroup label="Problem Title" name="title" placeholder="e.g., Two Sum" />
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
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
                            <FormGroup label="Slug" name="slug" placeholder="e.g., two-sum" />
                            <FormGroup label="Tags" name="tags" placeholder="e.g., Array, Hash Table" />

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                              <Field as="select" name="difficulty" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                              </Field>
                            </div>

                            <FormGroup label="Problem Topic" name="problemTopic" placeholder="e.g., Algorithms" />
                            <FormGroup label="Function Name" name="functionName" placeholder="e.g., twoSum" />
                            <FormGroup label="Input Type" name="inputType" placeholder="e.g., nums: int[], target: int" />
                            <FormGroup label="Return Type" name="returnType" placeholder="e.g., int[]" />
                          </div>
                        </div>
                      )}

                      {/* Details Tab */}
                      {activeTab === "details" && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <Field
                              as="textarea"
                              name="description"
                              rows={5}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                              placeholder="Detailed problem description..."
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Algorithm Steps</label>
                            <FieldArray name="algorithmSteps">
                              {({ push, remove }) => (
                                <div className="space-y-3">
                                  {values.algorithmSteps.map((step, index) => (
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
                                  ))}
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
                              <h3 className="font-semibold text-gray-900">Time Complexity</h3>
                              <FormGroup label="Value" name="timeComplexity.value" placeholder="e.g., O(n)" />
                              <FormGroup label="Explanation" name="timeComplexity.explanation" placeholder="Brief explanation..." />
                            </div>
                            <div className="space-y-4 p-4 bg-white rounded-xl border border-gray-200">
                              <h3 className="font-semibold text-gray-900">Space Complexity</h3>
                              <FormGroup label="Value" name="spaceComplexity.value" placeholder="e.g., O(1)" />
                              <FormGroup label="Explanation" name="spaceComplexity.explanation" placeholder="Brief explanation..." />
                            </div>
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
                                  <div key={index} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm relative group">
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
                                    <h4 className="font-medium text-gray-900 mb-4">Test Case #{index + 1}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="md:col-span-2">
                                        <FormGroup label="Input" name={`testCases.${index}.input`} placeholder="Input values..." />
                                      </div>
                                      <FormGroup label="Expected Output" name={`testCases.${index}.expected`} placeholder="Expected result..." />
                                      <FormGroup label="Explanation" name={`testCases.${index}.explanation`} placeholder="Why this output?" />
                                      <div className="flex items-center gap-2 mt-2">
                                        <Field type="checkbox" name={`testCases.${index}.hidden`} id={`hidden-${index}`} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                        <label htmlFor={`hidden-${index}`} className="text-sm text-gray-700">Hidden Test Case</label>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => push({ input: "", expected: "", explanation: "", hidden: false })}
                                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all font-medium flex items-center justify-center gap-2"
                                >
                                  <Plus size={20} /> Add Test Case
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      )}

                      {/* Solution Tab */}
                      {activeTab === "solution" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-6">
                            {["javascript", "java", "python", "cpp"].map((lang) => (
                              <div key={lang} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 capitalize">{lang} Solution</label>
                                <Field
                                  as="textarea"
                                  name={`solution.${lang}`}
                                  rows={6}
                                  className="w-full px-4 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
                                  placeholder={`Paste your ${lang} solution here...`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3 sticky bottom-0">
                      <button
                        type="button"
                        onClick={() => setIsAddMode(false)}
                        className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save Problem
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </AnimatePresence>

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
                <h3 className="font-bold text-gray-900 text-lg">{problem.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{problem.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">Acceptance: {problem.acceptance}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${problem.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {problem.status === "Published" ? <CheckCircle size={14} /> : <XCircle size={14} />}
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
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default ProblemManagement;
