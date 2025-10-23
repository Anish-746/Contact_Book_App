import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddContact = ({ contact, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    contact || { name: '', email: '', phone: '' }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'John Doe' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
    { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+1 (555) 123-4567' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {contact ? 'Edit Contact' : 'Add New Contact'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-500" />
        </button>
      </div>
      
      <div className="p-6 space-y-5">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              } focus:border-blue-500 focus:outline-none transition-colors`}
              placeholder={field.placeholder}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          {contact ? 'Update' : 'Add Contact'}
        </button>
      </div>
    </div>
  );
};

export default AddContact;