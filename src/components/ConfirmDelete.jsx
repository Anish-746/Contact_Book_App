import React from "react";
import { X, Trash2 } from "lucide-react";

const ConfirmDelete = ({ onClose, onConfirm }) => {
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Delete Contact</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-gray-700 text-lg">
              Are you sure you want to delete this contact?
            </p>
            <p className="text-gray-500 text-sm mt-1">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
