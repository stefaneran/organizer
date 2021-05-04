import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    marginBottom: '1em'
  }
}));

const EventsToolbar = ({ onOpenInfo }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Button 
        onClick={onOpenInfo} 
        color="primary" 
        variant="outlined"
      >
        Add
      </Button>
    </div>
  )
}

export default EventsToolbar;