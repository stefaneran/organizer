import * as React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { CategoryCarousel } from '@components/CategoryCarousel';
import { CreateCategoryWizard } from '@components/Wizards/CreateCategoryWizard';
import categoriesMock from '@mocks/categories.mock';

const CategoryView = () => {
  const [isCreateWizardOpen, setCreateWizardOpen] = React.useState(false);

  const handleCloseCreateWizard = ({ isSubmit, formData }) => {
    if(isSubmit) {
      console.log(formData);
      // Add Category
    }
    setCreateWizardOpen(false);
  }

  return (
    <>
      <Paper className="paper">
        <Grid container direction="column">
          <Grid id="category_actions" item container direction="row">
            <Grid item>
              <Button variant="outlined" color="primary" onClick={() => setCreateWizardOpen(true)}>Add New</Button>
            </Grid>
          </Grid>
          <Grid item>
            <CategoryCarousel categories={categoriesMock} />
          </Grid>
        </Grid>

        <CreateCategoryWizard isOpen={isCreateWizardOpen} onClose={handleCloseCreateWizard} />
      </Paper>
    </>
  );
}

export default CategoryView;