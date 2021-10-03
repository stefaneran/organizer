import defaultActivityFilters from 'activities/utils/defaultActivityFilters';
import { ActivityFilters } from 'activities/types';

// TODO unit test and generalize and move to @core
const areFiltersEmpty = (
  activitiesFilters: ActivityFilters
): boolean => {
  for (const [property, value] of Object.entries(defaultActivityFilters)) {
    if (activitiesFilters[property] !== value) {
      return false;
    }
  }
  return true;
}

export default areFiltersEmpty;