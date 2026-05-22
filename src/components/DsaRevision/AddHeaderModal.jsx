import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const AddHeaderModal = ({ isOpen, onClose }) => {
  const { jwtToken } = useAppContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoadingState] = useState(false);

  // console.log("jwt Token is : ",jwtToken);

  const [form, setForm] = useState({
    headerId: "",
    title: "",
    description: "",
    // topicIds: [""],
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTopicIdChange = (index, value) => {
    const updated = [...form.topicIds];
    updated[index] = value;
    setForm({ ...form, topicIds: updated });
  };

  const addTopicId = () => {
    setForm({ ...form, topicIds: [...form.topicIds, ""] });
  };

  const removeTopicId = (index) => {
    const updated = form.topicIds.filter((_, i) => i !== index);
    setForm({ ...form, topicIds: updated.length ? updated : [""] });
  };

  const handleSubmit = async (e) => {
    setLoadingState(true);
    e.preventDefault();

    const response = await axios.post(`${BACKEND_URL}/dsaHeader/add`, form, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    // console.log(response.data);

    if (response.data.status == 1) {
      toast.success(`Category added successfully`);
    } else {
      toast.error(`Category not added`);
    }
    setTimeout(() => {
        setLoadingState(false);
        setForm({
          headerId: "",
          title: "",
          description: "",
        });
        onClose();
      }, 1500);
    // console.log("Form Data:", form);
  };

  return (
    <>
      {/* <ToastContainer/> */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 border border-gray-100 dark:border-slate-700/50">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">
              Add New Category
            </h2>
            <button
              onClick={() => {
                onClose();
                setForm({
                  headerId: "",
                  title: "",
                  description: "",
                });
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {/* headerId */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-5">
              <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">
                Category Id :
              </label>
              <input
                type="text"
                name="headerId"
                value={form.headerId}
                onChange={handleChange}
                placeholder="e.g., arrays-header"
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* title */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-5">
              <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">
                Category :
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Data Structures"
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* description */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-5">
              <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">
                Description :
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g., Fundamental data structure concepts"
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setForm({
                    headerId: "",
                    title: "",
                    description: "",
                  });
                }}
                className="flex-1 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddHeaderModal;
