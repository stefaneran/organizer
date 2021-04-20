import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import EventCalendar from './EventCalendar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '50%'
  }
}));

const EventsPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <EventCalendar />
    </div>
  )
}

export default EventsPanel;