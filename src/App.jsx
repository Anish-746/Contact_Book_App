import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import ConfirmDelete from './components/ConfirmDelete.jsx';
import Modal from './utils/Modal.jsx';
import Toast from './utils/Toast.jsx';
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
  const [modal, setModal] = useState({
    type: null,
    payload: null
  });
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

  const handleFormSubmit = (formData) => {
    if (modal.type === 'edit') {
      setContacts(contacts.map(c =>
        c.id === modal.payload.id ? { ...c, ...formData } : c
      ));
      setToast({ message: 'Contact updated successfully!', type: 'success' });
    } else {
      const newContact = { id: Date.now(), ...formData };
      setContacts([...contacts, newContact]);
      setToast({ message: 'Contact added successfully!', type: 'success' });
    }
    closeModal();
  };

  const handleDeleteContact = (id) => {
    setDeletingContactId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setContacts(contacts.filter(c => c.id !== modal.payload));
    setToast({ message: 'Contact deleted successfully!', type: 'success' });
    closeModal();
  };

  const openModal = (type, payload = null) => {
    setModal({ type, payload });
  };

  const closeModal = () => {
    setModal({ type: null, payload: null });
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

      <Header onAddClick={() => openModal('add')} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="container mx-auto px-4 pb-12">
        <ContactList
          contacts={filteredContacts}
          onEdit={(contact) => openModal('edit', contact)}
          onDelete={(id) => openModal('delete', id)}
        />
      </main>

      <Modal isOpen={modal.type === 'add' || modal.type === 'edit'} onClose={closeModal}>
        <AddContact
          contact={modal.payload}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <Modal isOpen={modal.type === 'delete'} onClose={closeModal}>
        <ConfirmDelete
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      </Modal>
    </div>
  );
};

export default App;