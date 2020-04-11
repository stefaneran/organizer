import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { CategoryView } from '@containers/CategoryView';
import { HistoryView } from '@containers/HistoryView';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '0.5em'
  },
  categoriesContainer: {
    paddingRight: '1em'
  },
  headerContainer: {
    maxWidth: 'none',
    marginBottom: '0.5em'
  },
  footerContainer: {
    marginTop: '0.5em',
    maxWidth: 'none'
  }
}));  

const MainPage = (store) => {
  const classes = useStyles();
  return (
    <Grid 
      id="main" 
      container
      direction="column"
      className={classes.mainContainer}
    >
      <Grid item xs={1} className={classes.headerContainer}>
        <Paper id="header" style={{ height: '100%' }}>Header</Paper>
      </Grid>
      <Grid id="content" container direction="row" xs>
        <Grid id="categories" item xs={9} className={classes.categoriesContainer}>
          <CategoryView store={store} />
        </Grid>
        <Grid id="history" item xs>
          <HistoryView store={store} />
        </Grid>
      </Grid>
      <Grid item xs={1} className={classes.footerContainer}>
        <Paper id="footer" style={{ height: '100%' }}>Footer</Paper>
      </Grid>
    </Grid>
  )
}

export default MainPage;