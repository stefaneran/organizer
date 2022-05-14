import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import calculateContactUrgency from 'contacts/utils/calculateContactUrgency';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '1em',
    width: '5em',
    border: '1px solid rgba(0, 0, 0, 0.30)',
    boxShadow: '0px 0px 0px 0px #3f51b5',
    transition: 'box-shadow 200ms, border 200ms',
    cursor: 'default'
  },
  progress: {
    height: '100%',
    background: '#B4F8C8',
  },
  rounded: {
    borderBottomLeftRadius: '1em',
    borderTopLeftRadius: '1em',
    borderBottomRightRadius: '1em',
    borderTopRightRadius: '1em'
  },
  highlighted: {
    '&:hover': {
      boxShadow: '0px 0px 8px 2px #3f51b5',
      border: '1px solid #3f51b5',
      cursor: 'pointer'
    }
  }
}));

const positiveColor = '#B4F8C8';
const negativeColor = '#F51720';

const getTooltipText = (daysPassed, isHangout) => {
  if (daysPassed === -1) {
    return `No ${isHangout ? 'hangout' : 'contact'}`;
  } 
  return `${daysPassed} days since last ${isHangout ? 'hangout' : 'contact'}`;
}

interface Props {
  lastContact: number;
  isHangout: boolean;
  mobile?: boolean;
  onClick?: (event) => void;
}

const ContactMeter: React.FC<Props> = ({ 
  lastContact, 
  isHangout,
  mobile, 
  onClick 
}) => {
  const classes = useStyles();

  const { urgent, percent, daysPassed } = calculateContactUrgency(lastContact);

  const tooltipText = getTooltipText(daysPassed, isHangout);
  const width = `${percent === -1 ? '0' : percent}%`;
  const background = urgent ? negativeColor : positiveColor;

  return (
    <Tooltip title={tooltipText}>
      <div 
        className={clsx(classes.container, classes.rounded, !isHangout ? classes.highlighted : '')}
        style={{ 
          width: mobile ? '3em' : '5em',
          marginBottom: !isHangout ? '0.5em' : '0'
        }}
        onClick={onClick}
      >
        <div 
          className={clsx(classes.progress, classes.rounded)} 
          style={{ width, background }} 
        />
      </div>
    </Tooltip>
  )
}

export default ContactMeter;