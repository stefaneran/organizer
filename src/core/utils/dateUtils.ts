import {
  differenceInDays,
  format
} from 'date-fns';

export const getDaysFromDate = (timestamp) => differenceInDays(new Date(), new Date(timestamp));

// Returns a date like: Monday (18/02)
export const formatEventDate = (timestamp) => 
  timestamp ? format(new Date(timestamp), 'EEEE (dd/MM)') : 'Error';

// Returns a date like: 27/05/20
export const formatDateClassic = (timestamp) => 
  timestamp ? format(new Date(timestamp), 'dd/MM/yy') : 'Error';

// Return 24h time of the timestamp like: 23:59
export const formatDateTime = (timestamp) =>
  timestamp ? format(new Date(timestamp), 'HH:mm') : 'Error';