import * as React from 'react';
import ProgressBar from '@core/components/ProgressBar';
import calculateContactBarPercentage from 'contacts/utils/calculateContactBarPercentage';

const getTooltipText = (daysPassed, isHangout) => {
  if (daysPassed === -1) {
    return `No ${isHangout ? 'hangout' : 'contact'} logged`;
  }
  return `${daysPassed} days since last ${isHangout ? 'hangout' : 'contact'}`;
}

interface Props {
  lastContact: number;
  isHangout: boolean;
  daysFrequency?: number;
  mobile?: boolean;
  onClick?: (event) => void;
}

const ContactMeter: React.FC<Props> = ({
  lastContact,
  isHangout,
  daysFrequency,
  mobile,
  onClick
}) => {
  const { isUrgent, percent, daysPassed } = calculateContactBarPercentage(lastContact, daysFrequency);

  const tooltipText = getTooltipText(daysPassed, isHangout);

  return (
    <ProgressBar
      percentage={percent}
      tooltipText={tooltipText}
      isClickable={!isHangout}
      isNegative={isUrgent}
      onClick={onClick}
      width={mobile ? '3em' : '5em'}
      marginBottom={isHangout ? '0' : '0.5em'}
    />
  )
}

export default ContactMeter;