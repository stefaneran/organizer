import { ContactFilters, Genders, RelationshipStatus } from '@contacts/types';

const defaultFilters: ContactFilters = {
  group: 'All',
  name: '',
  location: '',
  gender: "All" as "All",
  relationshipStatus: "All" as "All",
  oneOnOne: false
}

export default defaultFilters;