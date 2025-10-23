import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import Modal from './components/Modal.jsx';
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
  };

  const handleEditContact = (formData) => {
    setContacts(contacts.map(c =>
      c.id === editingContact.id ? { ...c, ...formData } : c
    ));
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
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
    </div>
  );
};

export default App;