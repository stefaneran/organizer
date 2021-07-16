import { ActivityLocation } from 'activities/types';

const checkIsLocationsEmpty = (locations: ActivityLocation[] = []): boolean => {
  for (const location of locations) {
    const { name, address } = location;
    if (name.length || address.length) {
      return false;
    }
  }
  return true;
}

export default checkIsLocationsEmpty;