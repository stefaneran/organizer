import * as React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {

  }
}));

const SideCategory = ({ category }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {category.title}
    </Paper>
  );
}

export default SideCategory;