import * as React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { CategoryCarousel } from '@components/CategoryCarousel';
import { ChooseCategoryDialog } from '@components/Dialogs/ChooseCategoryDialog';
import { CreateCategoryWizard } from '@components/Wizards/CreateCategoryWizard';
import categoriesMock from '@mocks/categories.mock';

const CategoryView = () => {
  const [isChooseCategoryDialogOpen, setChooseCategoryDialogOpen] = React.useState(false);
  const [createWizardInfo, setCreateWizardInfo] = React.useState({ isOpen: false, categoryType: null });

  const handleOpenChooseCategory = () => {
    setChooseCategoryDialogOpen(true);
  }
  // Close the "Choose Category" dialog which leads to open CreateCategoryWizard
  const handleCloseChooseCategory = ({ categoryType }) => {
    setCreateWizardInfo({
      isOpen: categoryType ? true : false,
      categoryType
    });
    setChooseCategoryDialogOpen(false);
  }
  const handleCloseCreateWizard = ({ isSubmit, formData }) => {
    if(isSubmit) {
      console.log(formData);
      // Add Category
    }
    setCreateWizardInfo({
      isOpen: false,
      categoryType: null
    });
  }

  return (
    <>
      <Paper className="paper">
        <Grid container direction="column">
          <Grid id="category_actions" item container direction="row">
            <Grid item>
              <Button variant="outlined" color="primary" onClick={handleOpenChooseCategory}>Add New</Button>
            </Grid>
          </Grid>
          <Grid item>
            <CategoryCarousel categories={categoriesMock} />
          </Grid>
        </Grid>

        <ChooseCategoryDialog isOpen={isChooseCategoryDialogOpen} onClose={handleCloseChooseCategory} />
        {createWizardInfo.categoryType && (
          <CreateCategoryWizard 
            isOpen={createWizardInfo.isOpen} 
            onClose={handleCloseCreateWizard} 
            categoryType={createWizardInfo.categoryType} 
          />
        )}
      </Paper>
    </>
  );
}

export default CategoryView;