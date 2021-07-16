import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { ParticipantType } from 'activities/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  participantsContainer: {
    marginBottom: '1em'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

interface Props {
  participantType: ParticipantType[]
}

const ActivityParticipants: React.FC<Props> = ({ participantType }) => {
  const classes = useStyles();
  return (
    <div className={classes.participantsContainer}>
      {participantType ? participantType.map(type => (
        <Chip 
          className={classes.chip}
          key={type} 
          label={type}
          color="primary"
        />
      )) : null}
    </div>
  )
}

export default ActivityParticipants;