import { ContactFilters, SortOption } from '@contacts/types';

const defaultFilters: ContactFilters = {
  group: 'All',
  name: '',
  location: '',
  gender: "All" as "All",
  relationshipStatus: "All" as "All",
  sort: SortOption.Name,
  oneOnOne: false
}

export default defaultFilters;