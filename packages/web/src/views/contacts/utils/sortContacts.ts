import { Contact, SortOption } from 'contacts/types';
import genericSort from '@core/utils/genericSort';
import calculateContactBarPercentage from 'contacts/utils/calculateContactBarPercentage';

const sortPropertyMap = {
  [SortOption.LastContact]: 'lastContact',
  [SortOption.LastHangout]: '',
  [SortOption.Location]: 'location',
  [SortOption.Name]: 'name'
}

const sortContacts = (
  filteredContacts: Contact[],
  sortOption: SortOption
): Contact[] => {
  let sorted;
  // If last hangout, need to do special calculation because hangoutFrequency factors into urgency
  if (sortOption === SortOption.LastHangout) {
    sorted = filteredContacts.sort((a, b) => {
      const resultA = calculateContactBarPercentage(a.lastHangout, a.hangoutFrequency);
      const resultB = calculateContactBarPercentage(b.lastHangout, b.hangoutFrequency);
      const A = resultA.isUrgent ? -1 * (resultA.percent) : resultA.percent;
      const B = resultB.isUrgent ? -1 * (resultB.percent) : resultB.percent;
      return genericSort(A, B);
    });
    return sorted;
  }
  const sortProperty = sortPropertyMap[sortOption];
  sorted = filteredContacts.sort((a, b) => genericSort(a[sortProperty], b[sortProperty]));
  return sorted;
}

export default sortContacts;