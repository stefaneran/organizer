import * as React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { CategoryCarousel } from '../../components/CategoryCarousel';
import categoriesMock from '../../mocks/categories.mock';

const CategoryView = () => {
  return (
    <>
      <Paper className="paper">
        <Grid container direction="column">
          Category View
          <Grid id="category_actions" item container direction="row">
            <Grid item>
              <Button variant="outlined" color="primary">Add New</Button>
            </Grid>
          </Grid>
          <Grid item>
            <CategoryCarousel categories={categoriesMock} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CategoryView;