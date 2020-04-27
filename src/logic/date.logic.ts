import {
  startOfWeek,
  endOfWeek,
  format
} from 'date-fns';

export const getWeekHourGoalProgress = (category) => {
  let progress = 0;
  const start = startOfWeek(Date.now());
  const end = endOfWeek(Date.now());
  category.history.forEach(log => {
    const { activityDate, unit } = log;
    if(activityDate >= start && activityDate <= end) {
      progress += unit;
    }
  });
  return progress;
}

export const formatDataBasic = (timestamp) => 
  format(new Date(timestamp), 'EEEE - do MMMM');