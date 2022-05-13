import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import EventListItem from 'contacts/components/EventsPanel/EventListItem';
import { Event } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
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
  onOpenInfoPanel: () => void;
}

const ListItem: React.FC<ItemProps> = ({ event, onOpenInfoPanel }) => {
  return (
    <EventListItem
      event={event}
      onOpenInfo={onOpenInfoPanel}
    />
  )
}

interface ListProps {
  showUpcoming: boolean; 
  eventsList: Event[];
  onOpenInfoPanel: (eventId?: string) => void;
}

// There's a lot more props but we only care about index at the moment
interface RenderRowProps {
  index: number;
}

const EventsList: React.FC<ListProps> = ({ showUpcoming, eventsList, onOpenInfoPanel }) => {
  const classes = useStyles();

  const renderRow = ({ index }: RenderRowProps) => {
    const event = eventsList[index];
    return <ListItem key={event.id} event={event} onOpenInfoPanel={onOpenInfoPanel} />
  }

  return (
    <div className={classes.container}>
      {eventsList.length ? (
        <>
          {showUpcoming ? eventsList.map((event, index) => renderRow({ index })) : (
            <List
              height={475}
              rowCount={eventsList.length}
              rowHeight={110}
              rowRenderer={renderRow}
              width={600}
            />
          )}
        </>
      ) : null}
    </div>
  )
}

export default EventsList;