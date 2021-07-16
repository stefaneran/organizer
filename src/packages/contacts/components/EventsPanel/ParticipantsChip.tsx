import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip, Tooltip } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import getShortName from 'contacts/utils/getShortName';
import { Contact } from 'contacts/types';

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

interface TooltipProps {
  participants: string[];
  contacts: Record<string, Contact>;
}

const ToolTipText: React.FC<TooltipProps> = ({ 
  participants, 
  contacts 
}) => {
  return (
    <div>
      {participants.map((id) => 
        <React.Fragment key={id}>
          {contacts[id].name}
          <br />
        </React.Fragment>
      )}
    </div>
  )
}

interface Props {
  participants: string[];
  contacts: Record<string, Contact>;
  style?: Record<string, string | number>;
}

const ParticipantsChip: React.FC<Props> = ({ 
  participants = [], 
  contacts, 
  style 
}) => {
  const classes = useStyles();

  const numOfParticipants = participants.length;
  const isGroup = Boolean(numOfParticipants > 1);

  // In the case we have only one atendee we want to print their first name and first letter of last name
  const participantName = contacts[participants[0]]?.name ?? '';
  const participantLabel = getShortName(participantName);

  const label = isGroup ? `${numOfParticipants} Atendees` : participantLabel;
  const icon = isGroup ? <PeopleAltIcon /> : <PersonIcon />;

  return (
    <Tooltip title={<ToolTipText participants={participants} contacts={contacts} />}>
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