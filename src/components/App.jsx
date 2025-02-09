import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import s from "./App.module.css";

function App() {
  const localKey = "contactsData";
  const [contacts, setContacts] = useState(() => {
    const savedData = window.localStorage.getItem(localKey);

    if (savedData !== null) {
      return JSON.parse(savedData);
    }
    return [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ];
  });
  const [searchValue, setSearchValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const handleFilter = (e) => {
    setSearchValue(e.target.value);
  };

  const updateContacts = (contact) => {
    setContacts([...contacts, { ...contact, id: nanoid() }]);
  };

  const deleteContact = (contactId) => {
    setContacts(
      contacts.filter((contact) => {
        return contact.id !== contactId;
      })
    );
  };

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  }, [searchValue, contacts]);

  useEffect(() => {
    window.localStorage.setItem(localKey, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className={s.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm func={updateContacts} />
      <SearchBox func={handleFilter} value={searchValue} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
