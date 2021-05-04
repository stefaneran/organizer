import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ActivityTypeIcon from '@activities/components/ActivityTypeIcon';
import Event from '@contacts/interfaces/Event.interface';
import Activity from '@activities/interfaces/Activity.interface';
import { formatEventDate } from '@core/utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '0.5em',
    marginBottom: '0.5em',
    cursor: 'pointer',
    transition: 'background 300ms, color 300ms',
    '& .subtitle': {
      color: 'rgba(0, 0, 0, 0.54)',
      transition: 'color 300ms',
    },
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff',
      '& .subtitle': {
        color: '#fff',
      }
    }
  },
  iconContainer: {
    marginRight: '0.5em'
  },
  infoContainer: {
    textAlign: 'left'
  }
}));

const iconStyles = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
  height: '1.5em',
  width: '1.5em'
}

interface Props {
  event: Event;
  getActivity: (id: string) => Activity;
  onOpenInfo: (id: string) => void;
}

const EventListItem = ({ event, getActivity, onOpenInfo }: Props) => {
  const classes = useStyles();
  
  const activity = getActivity(event.activityId);

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
          {`${activity?.name} - ${formatEventDate(event?.date)}`}
        </Typography>
        <Typography variant="subtitle2" className="subtitle">
          {activity?.locations[event.activityLocationIndex].name}
        </Typography>
      </div>
    </Paper>
  )
}

export default EventListItem;