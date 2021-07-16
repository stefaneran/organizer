import { getDaysFromDate } from 'core/utils/dateUtils'

type ReturnType = {
  urgent: boolean;
  percent: number;
  daysPassed: number;
}

const error = {
  urgent: false,
  percent: -1,
  daysPassed: -1
}

// Can be either lastContact or lastHangout depending on what we're looking for
const calculateContactUrgency = (lastDate: number): ReturnType => {
  if (lastDate === 0) {
    return error;
  }
  const daysPassed = getDaysFromDate(lastDate);
  // Urgent if last contact is 30 days or more
  const urgent = daysPassed > 30;
  let percent = Math.floor((daysPassed % 30) / 30 * 100);
  if (urgent) {
    // Percentage starting at 0% from 30 days to 100% at 60 days and above 
    // Default to 100% after 60
    percent = daysPassed < 61 ? Math.floor((daysPassed % 30) / 30 * 100) : 100;
    // Edge case: Happens at 60 
    if (percent === 0) {
      percent = 100;
    }
  }
  else {
    // Inverse percentage, starts at 100% and approaches 0% as it gets closer to 30 days
    percent = Math.abs(Math.floor((daysPassed % 30) / 30 * 100) - 100);
    if (daysPassed === 30) {
      percent = 0;
    }
  }
  return { urgent, percent, daysPassed }
}

export default calculateContactUrgency;