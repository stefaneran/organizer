import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import calculateContactUrgency from 'contacts/utils/calculateContactUrgency';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '1em',
    width: '5em',
    border: '1px solid rgba(0, 0, 0, 0.30)'
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
  }
}));

const positiveColor = '#B4F8C8';
const negativeColor = '#F51720';

interface Props {
  lastContact: number;
}

const ContactMeter: React.FC<Props> = ({ lastContact }) => {
  const classes = useStyles();

  const { urgent, percent, daysPassed } = calculateContactUrgency(lastContact);

  const tooltip = daysPassed === -1 ? 'No contact' : `${daysPassed} days since last contact`;
  const width = `${percent === -1 ? '0' : percent}%`;
  const background = urgent ? negativeColor : positiveColor;

  return (
    <Tooltip title={tooltip}>
      <div className={clsx(classes.container, classes.rounded)}>
        <div 
          className={clsx(classes.progress, classes.rounded)} 
          style={{ width, background }} 
        />
      </div>
    </Tooltip>
  )
}

export default ContactMeter;