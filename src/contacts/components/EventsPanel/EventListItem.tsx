import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ActivityTypeIcon from '@activities/components/ActivityTypeIcon';
import ParticipantsChip from '@contacts/components/EventsPanel/ParticipantsChip';
import { Event } from '@contacts/types.d';
import Activity from '@activities/interfaces/Activity.interface';
import { formatEventDate, formatDateTime } from '@core/utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '0.5em',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background 300ms, color 300ms',
    '& .subtitle': {
      color: 'rgba(0, 0, 0, 0.54)',
      transition: 'color 300ms',
    },
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
      '& .subtitle': {
        color: '#fff',
      }
    }
  },
  iconContainer: {
    marginRight: '1em'
  },
  infoContainer: {
    textAlign: 'left'
  },
  secondLine: {
    display: 'flex'
  }
}));

const iconStyles = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
  height: '2em',
  width: '2em'
}

interface Props {
  event: Event;
  activities;
  contacts;
  onOpenInfo: (id: string) => void;
}

const EventListItem: React.FC<Props> = ({ 
  event, 
  activities, 
  contacts, 
  onOpenInfo 
}) => {
  const classes = useStyles();
  
  const activity: Activity = activities[event.activityId];

  const eventTitle = event?.title ? `${event.title} - ` : '';
  const activityTitle = activity?.name ? `${activity.name} - ` : '';
  const title = `${eventTitle}${activityTitle}${formatEventDate(event?.date)}`;

  const eventTimeText = `${formatDateTime(event?.date)}`;
  const eventLocation = activity?.locations[event?.activityLocationIndex]?.name
  const eventLocationText = eventLocation ? ` - ${eventLocation}` : '';

  const handleOpenInfo = () => {
    onOpenInfo(event.id);
  }

  return (
    <Paper className={classes.container} onClick={handleOpenInfo}>
      <div className={classes.iconContainer}>
        <ActivityTypeIcon activityType={activity?.activityType} style={iconStyles} />
      </div>
      <div className={classes.infoContainer}>
        <Typography variant="h6">
          {title}
        </Typography>
        <div className={classes.secondLine}>
          <Typography variant="subtitle2" className="subtitle" style={{ marginRight: '0.3em' }}>
            {eventTimeText}
          </Typography>
          <Typography variant="subtitle2" className="subtitle">
            {eventLocationText}
          </Typography>
        </div>
        <ParticipantsChip
          participants={event?.participants}
          contacts={contacts}
          style={{ marginTop: '0.3em' }}
        />
      </div>
    </Paper>
  )
}

export default EventListItem;