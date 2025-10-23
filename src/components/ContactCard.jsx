import React from 'react';
import { Edit2, Trash2, Mail, Phone } from 'lucide-react';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
      <div className="bg-linear-to-r from-blue-500 to-purple-500 h-2"></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
            </div>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(contact)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Edit contact"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete contact"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail size={16} className="text-blue-500" />
            <span className="text-sm">{contact.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone size={16} className="text-purple-500" />
            <span className="text-sm">{contact.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;