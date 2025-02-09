import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className={s.wrapper}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          number={contact.number}
          deleteContact={() => {
            deleteContact(contact.id);
          }}
        />
      ))}
    </div>
  );
};

export default ContactList;
