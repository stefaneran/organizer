import { Contact, Genders, RelationshipStatus } from 'contacts/types';

// Empty contact object for creation
const defaultContact: Contact = {
  name: '',
  location: '',
  groups: [],
  gender: Genders.Male,
  relationshipStatus: RelationshipStatus.Single,
  oneOnOne: true,
  lastContact: 0,
  lastHangout: 0,
  hangoutTally: 0,
  dateCreated: Date.now()
}

export default defaultContact;