import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import Modal from './utilities/Modal.jsx';
import Toast from './utilities/Toast.jsx';
import { X, Trash2 } from 'lucide-react';
import { initialContacts } from './data.js';

const STORAGE_KEY = 'list_app_contacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      const storedContacts = localStorage.getItem(STORAGE_KEY);
      return storedContacts ? JSON.parse(storedContacts) : initialContacts;
    } catch(e) {
      console.error('Failed to load contacts form LocalStorage', e);
      return initialContacts;
    }  
});
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingContactId, setDeletingContactId] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (e) {
      console.error("Failed to save contacts:", e);
    }
  }, [contacts]);

  const handleAddContact = (formData) => {
    const newContact = {
      id: Date.now(),
      ...formData
    };
    setContacts([...contacts, newContact]);
    setIsModalOpen(false);
    setToast({ message: 'Contact added successfully!', type: 'success' });
  };

  const handleEditContact = (formData) => {
    setContacts(contacts.map(c =>
      c.id === editingContact.id ? { ...c, ...formData } : c
    ));
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (id) => {
    setDeletingContactId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setContacts(contacts.filter(c => c.id !== deletingContactId));
    setIsDeleteModalOpen(false);
    setDeletingContactId(null);
    setToast({ message: 'Contact deleted successfully!', type: 'success' });
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingContactId(null);
  };

  const openAddModal = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="min-h-screen min-w-screen bg-linear-to-br from-gray-50 to-gray-100">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <Header onAddClick={openAddModal} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="container mx-auto px-4 pb-12">
        <ContactList
          contacts={filteredContacts}
          onEdit={openEditModal}
          onDelete={handleDeleteContact}
        />
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddContact
          contact={editingContact}
          onSubmit={editingContact ? handleEditContact : handleAddContact}
          onCancel={closeModal}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={cancelDelete}>
        <div>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Delete Contact</h2>
            <button
              onClick={cancelDelete}
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
              onClick={cancelDelete}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;