import * as React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { CategoryListToolbar } from '@components/CategoryListToolbar';
import { CategoryBreadCrumbs } from '@components/CategoryBreadCrumbs';
import { CategoryList } from '@components/CategoryList';
import { ChooseCategoryDialog } from '@components/Dialogs/ChooseCategoryDialog';
import { CreateCategoryWizard } from '@components/Wizards/CreateCategoryWizard';
import { getCategories } from '@store/accessors';
import { mapTypeToComponent as mapTypeToCategoryComponent } from '@components/CategoryOverviews';
// import categoriesMock from '@mocks/categories.mock';

const { useState } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
      padding: '0.5em'
    }
  }
})); 

const CategoryView = ({ store }) => {
  const classes = useStyles();

  const { addCategoryThunk, saveDataThunk } = store;
  const categories = store.profiles && getCategories(store);

  const [currentCategory, setCurrentCategory] = useState({ categoryType: null, categoryData: null });

  // Dialog data
  const [isChooseCategoryDialogOpen, setChooseCategoryDialogOpen] = useState(false);
  const [createWizardInfo, setCreateWizardInfo] = useState({ isOpen: false, categoryType: null });

  const handleThumbClick = (categoryType, categoryData) => () => {
    setCurrentCategory({ categoryType, categoryData });
  }

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
    const { categoryType } = createWizardInfo;
    if(isSubmit) {
      addCategoryThunk({ ...formData, categoryType });
      saveDataThunk();
    }
    setCreateWizardInfo({
      isOpen: false,
      categoryType: null
    });
  }

  const toolBarHandlers = {
    onOpenChooseCategory: handleOpenChooseCategory
  }

  return (
    <Grid container className={classes.container}>
      <Paper>
        <Grid container direction="column" style={{ height: '100%' }}>

          <Route exact path={`/main/`}>
            <Grid id="category_actions" item container direction="row" xs={1}>
              <CategoryListToolbar toolBarHandlers={toolBarHandlers} />
            </Grid>
            <Grid item xs>
              <CategoryList
                categories={categories} 
                onThumbClick={handleThumbClick}
              />
            </Grid>
          </Route>

          <Route exact path={`/main/:category`} component={(historyProps) => (
            <>
              <CategoryBreadCrumbs history={historyProps} />
              {mapTypeToCategoryComponent({ 
                categoryType: currentCategory.categoryType, 
                ...currentCategory.categoryData
              })}
            </>
          )}/>

          <Route exact path={`/main/:category/:item`} component={(historyProps) => (
            <>
              <CategoryBreadCrumbs history={historyProps} />
            </>
          )}/>
          
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
    </Grid>
  );
}

export default CategoryView;