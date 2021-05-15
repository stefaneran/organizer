import Gender from '@contacts/interfaces/Genders.enum';
import RelationshipStatus from '@contacts/interfaces/RelationshipStatus.enum';

export interface ContactFilters {
  group: string;
  name: string;
  location: string;
  gender: Gender | 'All';
  relationshipStatus: RelationshipStatus | 'All';
  oneOnOne: boolean;
}

const filters: ContactFilters = {
  group: 'All',
  name: '',
  location: '',
  gender: "All" as "All",
  relationshipStatus: "All" as "All",
  oneOnOne: false
}

export default filters;