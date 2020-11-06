import {
  differenceInDays,
  startOfWeek,
  endOfWeek,
  format
} from 'date-fns';

export const getWeekHourGoalProgress = (category) => {
  let progress = 0;
  const start = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const end = endOfWeek(Date.now(), { weekStartsOn: 1 });
  category.history.forEach(log => {
    const { activityDate, unit } = log;
    if(activityDate >= start && activityDate <= end) {
      progress += unit;
    }
  });
  return progress;
}

export const getDaysFromDate = (timestamp) => differenceInDays(new Date(), new Date(timestamp));

export const formatDateBasic = (timestamp) => 
  format(new Date(timestamp), 'EEEE - do MMMM');

export const formatDateClassic = (timestamp) => 
  format(new Date(timestamp), 'dd/MM/yy');