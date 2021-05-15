import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    marginBottom: '1em'
  }
}));

const EventsToolbar = ({ onOpenInfo, toggleFilterPanel }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Tooltip title="Open Filters">
        <IconButton onClick={toggleFilterPanel}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add New Contact">
        <IconButton onClick={onOpenInfo}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default EventsToolbar;