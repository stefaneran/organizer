import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip, Tooltip } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chip: {
    marginRight: '0.5em',
    background: '#8D3EA3',
    color: '#fff',
    height: '1.8em',
    '& svg': {
      color: '#fff',
      height: '0.7em',
      width: '0.7em'
    }
  }
}));

interface Props {
  participants: string[];
  contacts;
  style?;
}

const ParticipantsChip = ({ participants, contacts, style }: Props) => {
  const classes = useStyles();

  const numOfParticipants = participants.length;
  const isGroup = Boolean(numOfParticipants > 1);

  // In the case we have only one atendee we want to print their first name and first letter of last name
  const participantName = contacts[participants[0]]?.name;
  const participantLabel = `${participantName.split(' ')[0]} ${participantName.split(' ')[1].charAt(0)}.`

  const label = isGroup ? `${numOfParticipants} Atendees` : participantLabel;
  const icon = isGroup ? <PeopleAltIcon /> : <PersonIcon />;

  return (
    <Tooltip title="Participants">
      <Chip 
        icon={icon}
        className={classes.chip}
        label={label}
        style={{ ...style }}
      />
    </Tooltip>
  )
}

export default ParticipantsChip;