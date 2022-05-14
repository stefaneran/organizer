import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Icons
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// Components
import { Tooltip, IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    marginBottom: '1em'
  }
}));

interface Props {
  onOpenInfo: (eventId?: string) => void;
  toggleFilterPanel: () => void;
}

const EventsToolbar: React.FC<Props> = ({ 
  onOpenInfo, 
  toggleFilterPanel
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>

      <Tooltip title="Open Filters">
        <IconButton onClick={toggleFilterPanel}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Add New Event">
        <IconButton onClick={() => onOpenInfo()}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>

    </div>
  )
}

export default EventsToolbar;