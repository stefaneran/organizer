import * as React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { CategoryListToolbar } from '@components/CategoryListToolbar';
import { CategoryBreadCrumbs } from '@components/CategoryBreadCrumbs';
import { CategoryList } from '@components/CategoryList';
import ChooseCategoryTypeDialog from '@components/Dialogs/ChooseCategoryTypeDialog';
import { CreateCategoryWizard } from '@components/Wizards/CreateCategoryWizard';
import { getCategories, getCategoryByTitle } from '@store/accessors';
import { mapTypeToComponent as mapTypeToCategoryComponent } from '@components/CategoryOverviews';
// import categoriesMock from '@mocks/categories.mock';

const { useState, useEffect } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
      padding: '0.5em'
    }
  },
  innerContainer: {
    height: '100%'
  }
})); 

const CategoryView = ({ store }) => {
  const classes = useStyles();

  const { addCategory, saveData } = store;
  const categories = store.profiles && getCategories(store);

  const [currentCategory, setCurrentCategory] = useState({ categoryType: null, categoryData: null });

  // Update Category state when store changes
  useEffect(() => {
    if(currentCategory.categoryData) {
      const title = currentCategory.categoryData ? currentCategory.categoryData.title : null;
      if(!title) return;
      const categoryData = getCategoryByTitle(store, currentCategory.categoryData.title);
      setCurrentCategory({ 
        categoryType: currentCategory.categoryType || null,
        categoryData: categoryData || null
      });
    }
  }, [store])

  // Dialog data
  const [isChooseCategoryDialogOpen, setChooseCategoryDialogOpen] = useState(false);
  const [currentCategoryType, setCurrentCategoryType] = useState(null);

  const handleThumbClick = (categoryType, categoryData) => () => {
    setCurrentCategory({ categoryType, categoryData });
  }

  const handleOpenChooseCategory = () => {
    setChooseCategoryDialogOpen(true);
  }
  // Close the "Choose Category" dialog which leads to open CreateCategoryWizard
  const handleCloseChooseCategory = ({ categoryType }) => {
    setCurrentCategoryType(categoryType);
    setChooseCategoryDialogOpen(false);
  }
  const handleCloseCreateWizard = ({ isSubmit, formData }) => {
    if(isSubmit) {
      addCategory({ 
        categoryType: currentCategoryType, 
        formData 
      });
      saveData();
    }
    setCurrentCategoryType(null);
  }

  const toolBarHandlers = {
    onOpenChooseCategory: handleOpenChooseCategory
  }

  return (
    <Paper className={classes.container}>
      <Grid className={classes.innerContainer} container direction="column">
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

      <ChooseCategoryTypeDialog isOpen={isChooseCategoryDialogOpen} onClose={handleCloseChooseCategory} />
      {currentCategoryType && (
        <CreateCategoryWizard 
          isOpen={Boolean(currentCategoryType)} 
          onClose={handleCloseCreateWizard} 
          categoryType={currentCategoryType} 
        />
      )}
    </Paper>
  );
}

export default CategoryView;