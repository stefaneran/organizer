import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '0 1em 1em 1em',
    textAlign: 'left',
    marginTop: '1em'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

const EventInfoParticipants = ({ participants = [] }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <>
        {participants.map(participant => (
          <Chip 
            className={classes.chip}
            key={participant} 
            label={participant}
            color="primary"
          />
        ))}
      </>
    </div>
  )
}

export default EventInfoParticipants;