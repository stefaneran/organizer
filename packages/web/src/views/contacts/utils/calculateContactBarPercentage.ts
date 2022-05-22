import { getDaysFromDate } from '@core/utils/dateUtils'

type ReturnType = {
  isUrgent: boolean;
  percent: number;
  daysPassed: number;
}

const error: ReturnType = {
  isUrgent: false,
  percent: -1,
  daysPassed: -1
}

// Can be either lastContact or lastHangout depending on what we're looking for
const calculateContactBarPercentage = (
  lastDate: number,
  daysFrequency = 30
): ReturnType => {
  if (lastDate === 0) {
    return error;
  }

  const daysPassed = getDaysFromDate(lastDate);

  // Urgent if days since last contact is bigger than set frequency
  const isUrgent = daysPassed > daysFrequency;

  let percent;

  if (isUrgent) {
    const maximumUrgency = ((daysFrequency * 2) + 1);
    const isBelowMaximumUrgency = daysPassed < maximumUrgency;

    percent = isBelowMaximumUrgency ? Math.floor((daysPassed % daysFrequency) / daysFrequency * 100) : 100;
    // Edge case: Happens at the exact number of daysFrequency
    if (percent === 0) {
      percent = 100;
    }
  }
  else {
    // Inverse percentage, starts at 100% and approaches 0% as it gets closer to 30 days
    percent = Math.abs(Math.floor((daysPassed % daysFrequency) / daysFrequency * 100) - 100);
    if (daysPassed === daysFrequency) {
      percent = 0;
    }
  }
  return { isUrgent, percent, daysPassed }
}

export default calculateContactBarPercentage;