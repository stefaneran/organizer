import Gender from '@contacts/interfaces/Genders.enum';
import RelationshipStatus from '@contacts/interfaces/RelationshipStatus.enum';

interface Contact {
  id?: string;
  name: string;
  location: string;
  groups: string[];
  gender: Gender;
  relationshipStatus: RelationshipStatus;
  oneOnOne: boolean; // Can you hang out with this person one on one or just in groups
}

export default Contact;