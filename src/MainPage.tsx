import * as React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { CategoryView } from './containers/CategoryView';
import { HistoryView } from './containers/HistoryView';

const MainPage = ({ store }) => {
  return (
    <Grid id="main" justify="space-between" container direction="column">
      <Paper id="header">Header</Paper>
      <Grid id="content" container direction="row">
        <Grid id="categories" item xs={7}>
          <CategoryView store={store} />
        </Grid>
        <Grid id="history" item xs>
          <HistoryView store={store} />
        </Grid>
      </Grid>
      <Paper id="footer">Footer</Paper>
    </Grid>
  )
}

export default MainPage;