import Contact from './Contact.interface';

interface ContactsStore {
  [id: string]: Contact;
}

export default ContactsStore;