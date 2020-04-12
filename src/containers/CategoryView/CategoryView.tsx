import * as React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
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
  },
  containerInner: {
    height: '100%'
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
    <Paper className={classes.container}>
      <Grid className={classes.containerInner} container direction="column">
        <Route exact path={`/main/`}>
          <Grid item xs={1} className={'gridRow'}>
            <CategoryListToolbar toolBarHandlers={toolBarHandlers} />
          </Grid>
          <Grid item xs={11} className={'gridRow'}>
            <CategoryList
              categories={categories} 
              onThumbClick={handleThumbClick}
            />
          </Grid>
        </Route>
        <Route exact path={`/main/:category`} component={(historyProps) => (
        <>
          <Grid item xs={1} className={'gridRow'}>
            <CategoryBreadCrumbs history={historyProps} />
          </Grid>
          <Grid item xs={11} className={'gridRow'}>
            {/* Will return a category overview screen */}
            {mapTypeToCategoryComponent({
              store, 
              categoryType: currentCategory.categoryType, 
              categoryData: currentCategory.categoryData
            })}
          </Grid>
        </>
        )}/>
      </Grid>
      
      {/* Dialogs and Pop-Ups below this line  */}

      <ChooseCategoryDialog isOpen={isChooseCategoryDialogOpen} onClose={handleCloseChooseCategory} />
      {createWizardInfo.categoryType && (
        <CreateCategoryWizard 
          isOpen={createWizardInfo.isOpen} 
          onClose={handleCloseCreateWizard} 
          categoryType={createWizardInfo.categoryType} 
        />
      )}
    </Paper>
  );
}

export default CategoryView;