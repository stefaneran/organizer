import { Contact, Genders } from 'contacts/types';

// Empty contact object for creation
const defaultContactProps: Contact = {
  name: '',
  location: '',
  groups: [],
  gender: Genders.Male,
  oneOnOne: true,
  lastContact: 0,
  lastHangout: 0,
  hangoutTally: 0,
  hangoutFrequency: 30,
  dateCreated: Date.now(),
  acquintances: {}
}

export default defaultContactProps;
