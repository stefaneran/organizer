import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List } from 'react-virtualized';
import EventListItem from '@contacts/components/EventsPanel/EventListItem';
import { Event } from '@contacts/types.d';
import 'react-virtualized/styles.css'; // only needs to be imported once

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '89%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  window: {
    border: '1px solid red'
  }
}));

interface ItemProps {
  event: Event;
  activities;
  contacts;
  onOpenInfoPanel: () => void;
}

const ListItem: React.FC<ItemProps> = ({ event, ...props }) => {
  return (
    <EventListItem
      event={event} 
      activities={props.activities}
      contacts={props.contacts} 
      onOpenInfo={props.onOpenInfoPanel}
    />
  )
}

interface ListProps {
  showUpcoming: boolean; 
  eventsList: Event[];
  activities;
  contacts;
  onOpenInfoPanel: (eventId?: string) => void;
}

const EventsList: React.FC<ListProps> = ({ showUpcoming, eventsList, ...props }) => {
  const classes = useStyles();

  const renderRow = ({ index }) => {
    const event = eventsList[index];
    return <ListItem key={event.id} event={event} {...props} />
  }

  return (
    <div className={classes.container}>
      {showUpcoming ? eventsList.map((event, index) => renderRow({ index })) : (
        <List
          height={475}
          rowCount={eventsList.length}
          rowHeight={110}
          rowRenderer={renderRow}
          width={600}
        />
      )}
    </div>
  )
}

export default EventsList;