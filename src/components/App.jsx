import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './Container.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    console.log('localContacts', localContacts);
    console.log('JSON.P', JSON.parse(localContacts));

    if (localContacts) setContacts(JSON.parse(localContacts));
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      console.log('JSONs', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicate = contacts.some(
      ({ name }) => newContact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    const contactObj = {
      id: nanoid(),
      ...newContact,
    };
    setContacts(prev => [...prev, contactObj]);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilter} />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
