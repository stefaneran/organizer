import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EventListItem from 'contacts/components/EventsPanel/EventListItem';
import { Event } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '89%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  eventsList: Event[];
  onOpenInfoPanel: (eventId?: string) => void;
}

const EventsList: React.FC<Props> = ({ eventsList, onOpenInfoPanel }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {eventsList.map(event => (
        <EventListItem
          key={event.id}
          event={event}
          onOpenInfo={onOpenInfoPanel}
        />
      ))}
    </div>
  )
}

export default EventsList;