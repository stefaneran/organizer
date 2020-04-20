import {
  startOfWeek,
  endOfWeek
} from 'date-fns';

export const getWeekHourGoalProgress = (category) => {
  let progress = 0;
  const start = startOfWeek(Date.now());
  const end = endOfWeek(Date.now());
  category.history.forEach(log => {
    const { activityDate, unit } = log;
    console.log('Start: ', start);
    console.log('End: ', end);
    if(activityDate >= start && activityDate <= end) {
      progress += unit;
    }
  });
  return progress;
}

export const formatDataBasic = (timestamp) => {

  // Return Monday 14th April
}