import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { CategoryView } from '@containers/CategoryView';
import { HistoryView } from '@containers/HistoryView';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '100%',
    padding: '0.5em'
  },
  categoriesContainer: {
    height: '100%'
  },
}));  

const MainPage = ({ store }) => {
  const classes = useStyles();
  return (
    <div id="main" className={classes.mainContainer}>
      <Grid id="content" className={classes.categoriesContainer} container spacing={1}>
        <Grid item xs={9} style={{ height: '100%' }}>
          <CategoryView store={store} />
        </Grid>
        <Grid item xs style={{ height: '100%' }}>
          <HistoryView store={store} />
        </Grid>
      </Grid>
    </div>
  )
}

export default MainPage;