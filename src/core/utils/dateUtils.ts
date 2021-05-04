import {
  differenceInDays,
  startOfWeek,
  endOfWeek,
  format
} from 'date-fns';

export const getWeekHourGoalProgress = (skill) => {
  let progress = 0;
  const start = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const end = endOfWeek(Date.now(), { weekStartsOn: 1 });
  skill.history.forEach(log => {
    const { activityDate, unit } = log;
    if(activityDate >= start && activityDate <= end) {
      progress += unit;
    }
  });
  return progress;
}

export const getDaysFromDate = (timestamp) => differenceInDays(new Date(), new Date(timestamp));

export const formatEventDate = (timestamp) => 
  timestamp ? format(new Date(timestamp), 'EEEE (dd/MM)') : 'Error';

export const formatDateClassic = (timestamp) => 
  timestamp ? format(new Date(timestamp), 'dd/MM/yy') : 'Error';