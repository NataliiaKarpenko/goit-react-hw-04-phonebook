import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { FormInput } from './Form/FormInput';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: nanoid(), name: 'Jimmy', number: '657483' },
        { id: nanoid(), name: 'Henry', number: '067543' },
        { id: nanoid(), name: 'Ruth', number: '846251' },
        { id: nanoid(), name: 'Cyndy', number: '998877' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  const formSubmitHandler = contactInfo => {
    if (contacts.some(({ name }) => name === contactInfo.name)) {
      alert(`${contactInfo.name} is already in contacts`);
      return;
    }

    const finalContact = {
      id: nanoid(),
      ...contactInfo,
    };

    setContacts(prevContacts => [...prevContacts, finalContact]);
  };

  const contactDeleteHandler = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const contactFilterHandler = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <h1>Phonebook</h1>
      <FormInput onFormSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} contactFilter={contactFilterHandler} />

      <ContactsList
        onContactDelete={contactDeleteHandler}
        contacts={getFilteredContacts()}
      />
    </>
  );
};
