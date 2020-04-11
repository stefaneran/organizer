import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {}
}));

interface IToolBarProps {
  toolBarHandlers: {
    onOpenChooseCategory(): void;
  }
}

const CategoryListToolbar = ({ toolBarHandlers }: IToolBarProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container>
        <Grid item>
          Filters: 
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary">Skill</Button> 
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary">Fitness</Button> 
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary">Social</Button> 
        </Grid>
        <Grid item>
          Actions: 
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={toolBarHandlers.onOpenChooseCategory}>Add New</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CategoryListToolbar;