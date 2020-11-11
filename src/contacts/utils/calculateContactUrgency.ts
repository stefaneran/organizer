import { getDaysFromDate } from '@core/utils/dateUtils';
import { PriorityType } from '@core/interfaces/general';

export default (priority, lastDate) => {
  const priorityMap = {
    [PriorityType.Low]: 90,
    [PriorityType.Moderate]: 30,
    [PriorityType.High]: 7
  };
  const daysSince = getDaysFromDate(lastDate);
  if (daysSince > priorityMap[priority]) {
    if (daysSince >= priorityMap[priority] * 2) {
      return 2;
    }
    return 1;
  }
  return 0;
}