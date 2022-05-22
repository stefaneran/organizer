import { ContactFilters, SortOption } from 'contacts/types';

const defaultFilters: ContactFilters = {
  group: 'All',
  name: '',
  location: '',
  gender: "All" as const,
  sort: SortOption.LastHangout,
  oneOnOne: false
}

export default defaultFilters;