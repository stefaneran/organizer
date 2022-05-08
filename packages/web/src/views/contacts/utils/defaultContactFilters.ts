import { ContactFilters, SortOption } from 'contacts/types';

const defaultFilters: ContactFilters = {
  group: 'All',
  name: '',
  location: '',
  gender: "All" as const,
  relationshipStatus: "All" as const,
  sort: SortOption.LastContact,
  oneOnOne: false
}

export default defaultFilters;