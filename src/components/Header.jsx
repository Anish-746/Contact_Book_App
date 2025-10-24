import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ onAddClick }) => {
  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contact Book</h1>
            <p className="text-blue-100 mt-1">Manage your contacts effortlessly</p>
          </div>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus size={20} />
            Add Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;