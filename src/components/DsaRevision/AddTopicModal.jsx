import React, { useState } from "react";
import { X } from "lucide-react";

const AddTopicModal = ({ isOpen, onClose }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Topic:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Add New Topic</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., String related Algorithms"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TitleId:
            </label>
            <input
              type="text"
              name="titleId"
              value={form.titleId}
              onChange={handleChange}
              placeholder="e.g., string-related-algo"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g., Master string manipulation, pattern matching..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty:
            </label>
            <input
              type="text"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              placeholder="e.g., hard"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
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
