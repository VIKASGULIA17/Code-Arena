import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import {toast} from "react-toastify";
import axios from "axios";

const AddTopicModal = ({ isOpen, onClose,targetCategory }) => {
  const {jwtToken} = useAppContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // console.log("Category ID received : ",targetCategory);

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "",
    titleId: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New Topic:", form);
    const response = await axios.post(`${BACKEND_URL}/DsaTitle/addTitle/${targetCategory}`,form,{
      headers:{
        Authorization : `Bearer ${jwtToken}`
      }
    })
    if(response.data.status == 1){
      toast.success(`Topic added successfully`);
      setForm({
        title: "",
        description: "",
        difficulty: "",
        titleId: "",
      });
      onClose();
    }
    else{
      toast.error(`Topic not added`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-slate-700/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">
            Add New Topic
          </h2>
          <button
            onClick={() => {
              onClose();
              setForm({
                title: "",
                description: "",
                difficulty: "",
                titleId: "",
              });
            }}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 w-20 flex-shrink-0">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., String related Algorithms"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 w-20 flex-shrink-0">
              TitleId:
            </label>
            <input
              type="text"
              name="titleId"
              value={form.titleId}
              onChange={handleChange}
              placeholder="e.g., string-related-algo"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 w-20 flex-shrink-0">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g., Master string manipulation..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 w-20 flex-shrink-0">
              Difficulty:
            </label>
            <input
              type="text"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              placeholder="e.g., hard"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setForm({
                  title: "",
                  description: "",
                  difficulty: "",
                  titleId: "",
                });
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-600 text-white dark:text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Add Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTopicModal;
