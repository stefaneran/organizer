import * as React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';

const CategoryView = () => {
  return (
    <>
      <Paper className="paper">
        <Grid container direction="column">
          Category View
          <Grid id="category_actions" container direction="row">
            <Grid item>
              <Button variant="outlined" color="primary">Add New</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CategoryView;