import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from the API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  // Add a new contact
  const addContact = () => {
    const newContact = { name: 'John Doe', phone: '493-170-9623' };

    axios
      .post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(response => {
        setContacts([...contacts, response.data]);
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  };

  // Edit a contact
  const editContact = (id) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, isEditing: true };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  // Save a contact
  const saveContact = (id) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, isEditing: false };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  // Handle contact field changes
  const handleContactChange = (id, field, value) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  // Delete a contact
  const deleteContact = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
        onClick={addContact}
      >
        Add Contact
      </button>
      <ul>
  {contacts.map(contact => (
    <li key={contact.id} className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          {contact.isEditing ? (
            <div>
              <input
                type="text"
                value={contact.name}
                onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)}
                className="border rounded p-1 mr-2"
              />
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)}
                className="border rounded p-1"
              />
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold">{contact.name}</p>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
          )}
        </div>
        <div>
          {contact.isEditing ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2"
              onClick={() => saveContact(contact.id)}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
              onClick={() => editContact(contact.id)}
            >
              Edit
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
