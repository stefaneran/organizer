import Contact from '@contacts/interfaces/Contact.interface';
import Gender from '@contacts/interfaces/Genders.enum';
import RelationshipStatus from '@contacts/interfaces/RelationshipStatus.enum';

// Empty contact object for creation
const defaultContact: Contact = {
  name: '',
  location: '',
  groups: [],
  gender: Gender.Male,
  relationshipStatus: RelationshipStatus.Single,
  oneOnOne: true
}

export default defaultContact;
