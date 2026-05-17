import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const DsaTemplateModal = ({
  isOpen,
  onClose,
  mode = "create",
  initialData = null,
  parentId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Validation schema
  const validationSchema = yup.object().shape({
    // parentId: yup.string().required('Parent ID is required'),
    title: yup.string().required("Title is required"),
    templateId: yup.string().required("Template ID is required"),
    // status: yup.boolean(),
    problemLinks: yup.array().of(
      yup.string().test("url", "Invalid URL", function (value) {
        if (!value) return true; // Allow empty
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      }),
    ),
    videoLinks: yup.array().of(
      yup.string().test("url", "Invalid URL", function (value) {
        if (!value) return true; // Allow empty
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      }),
    ),
    cpp: yup.string(),
    java: yup.string(),
    javascript: yup.string(),
    python: yup.string(),
  });

  const initialValues = initialData || {
    // parentId: '',
    title: "",
    templateId: "",
    // status: true,
    problemLinks: [""],
    videoLinks: [""],
    cpp: "",
    java: "",
    javascript: "",
    python: "",
  };

  // Dummy storage function - just shows toast
  const handleStorageSubmit = async (values) => {
    setIsLoading(true);
    // console.log("parent ID is : ",parentId);
    // console.log("Submitting DSA Template:", values);
    // console.log(parentId);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/DsaTemplate/addTemplate/${parentId}`,
        values,
      );

      // console.log(response.data);

      if (response.data.status == 1) {
        toast.success(
          `Template ${mode === "create" ? "created" : "updated"} successfully!`,
        );
      } else {
        toast.error(
          `Template not ${mode === "create" ? "created" : "updated"}`,
        );
      }

      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 500);
    } catch (error) {
      toast.error("Failed to save template");
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ToastContainer />
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl shadow-slate-300/30 dark:shadow-black/40">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {mode === "create" ? "Create" : "Edit"} DSA Template
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {mode === "create"
                      ? "Add a new DSA code template with examples in multiple languages"
                      : "Update existing DSA template"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div
                className="overflow-y-auto p-6"
                style={{ maxHeight: "calc(90vh - 140px)" }}
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleStorageSubmit}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form className="space-y-6">
                      {/* Basic Info Grid */}

                      {/* Template ID */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Template ID <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="input"
                          type="text"
                          name="templateId"
                          placeholder="e.g., array-basics, two-sum"
                          className={`w-full px-4 py-2 rounded-lg border transition-colors font-mono text-sm
                              ${
                                touched.templateId && errors.templateId
                                  ? "border-red-300 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30"
                                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50"
                              }
                              text-slate-900 dark:text-slate-100
                              placeholder:text-slate-400 dark:placeholder:text-slate-600
                              focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        <ErrorMessage
                          name="templateId"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="input"
                          type="text"
                          name="title"
                          placeholder="e.g., Array Basics - Declaration & Operations"
                          className={`w-full px-4 py-2 rounded-lg border transition-colors
                            ${
                              touched.title && errors.title
                                ? "border-red-300 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30"
                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50"
                            }
                            text-slate-900 dark:text-slate-100
                            placeholder:text-slate-400 dark:placeholder:text-slate-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        <ErrorMessage
                          name="title"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>

                      {/* Problem Links Section */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Problem Links
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const links = [...values.problemLinks, ""];
                              setFieldValue("problemLinks", links);
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                            Add Link
                          </button>
                        </div>
                        <div className="space-y-2">
                          {values.problemLinks.map((link, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Field
                                as="input"
                                type="url"
                                name={`problemLinks.${idx}`}
                                placeholder="https://leetcode.com/..."
                                className={`flex-1 px-4 py-2 rounded-lg border transition-colors text-sm
                                  ${
                                    touched.problemLinks?.[idx] &&
                                    errors.problemLinks?.[idx]
                                      ? "border-red-300 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30"
                                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50"
                                  }
                                  text-slate-900 dark:text-slate-100
                                  placeholder:text-slate-400 dark:placeholder:text-slate-600
                                  focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const links = values.problemLinks.filter(
                                    (_, i) => i !== idx,
                                  );
                                  setFieldValue("problemLinks", links);
                                }}
                                className="p-2 rounded-lg text-slate-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 size={16} className="cursor-pointer" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Video Links Section */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Video Links
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const links = [...values.videoLinks, ""];
                              setFieldValue("videoLinks", links);
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 cursor-pointer transition-colors"
                          >
                            <Plus size={14} className="cursor-pointer" />
                            Add Link
                          </button>
                        </div>
                        <div className="space-y-2">
                          {values.videoLinks.map((link, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Field
                                as="input"
                                type="url"
                                name={`videoLinks.${idx}`}
                                placeholder="https://youtube.com/..."
                                className={`flex-1 px-4 py-2 rounded-lg border transition-colors text-sm
                                  ${
                                    touched.videoLinks?.[idx] &&
                                    errors.videoLinks?.[idx]
                                      ? "border-red-300 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30"
                                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50"
                                  }
                                  text-slate-900 dark:text-slate-100
                                  placeholder:text-slate-400 dark:placeholder:text-slate-600
                                  focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const links = values.videoLinks.filter(
                                    (_, i) => i !== idx,
                                  );
                                  setFieldValue("videoLinks", links);
                                }}
                                className="p-2 rounded-lg text-slate-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Code Templates */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                          Code Templates
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {["cpp", "java", "javascript", "python"].map(
                            (lang) => (
                              <div key={lang}>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 capitalize">
                                  {lang}
                                </label>
                                <Field
                                  as="textarea"
                                  name={lang}
                                  placeholder={`Enter ${lang} code here...`}
                                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none h-32"
                                />
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={onClose}
                          disabled={isLoading}
                          className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-900 text-white 
    hover:bg-slate-800 
    active:bg-slate-950
    border border-slate-900
    shadow-sm hover:shadow-md

    dark:bg-white dark:text-slate-950
    dark:hover:bg-slate-200
    dark:active:bg-slate-300
    dark:border-white transition-colors disabled:opacity-50 flex cursor-pointer items-center justify-center gap-2"
                        >
                          {isLoading && (
                            <Loader size={16} className="animate-spin" />
                          )}
                          {mode === "create"
                            ? "Create Template"
                            : "Update Template"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DsaTemplateModal;
