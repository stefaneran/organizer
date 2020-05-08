import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { CategoryListToolbar } from '@components/CategoryListToolbar';
import { CategoryList } from '@components/CategoryList';
import ChooseCategoryTypeDialog from '@components/Dialogs/ChooseCategoryTypeDialog';
import { CreateCategoryWizard } from '@components/Wizards/CreateCategoryWizard';
import { getCategories, getCategoryByTitle } from '@store/accessors';
import { mapTypeToComponent as mapTypeToCategoryComponent } from '@components/CategoryOverviews';

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

  const handleThumbClick = (categoryType?, categoryData?) => () => {
    if(categoryType) {
      setCurrentCategory({ categoryType, categoryData });
    } else {
      handleOpenChooseCategory();
    }
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
    <div className={classes.container}>
      <Grid className={classes.innerContainer} container direction="column">
        {currentCategory.categoryData ? (
          <>
            <Grid item xs={1} className={'gridRow'}>
              <Paper style={{ padding: '0.5em' }}>
                <Button variant="outlined" color="primary" onClick={() => setCurrentCategory({ categoryType: null, categoryData: null })}>
                  Back
                </Button>
              </Paper>
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
        ) : (
          <>
            <Grid item xs={1} className={'gridRow'}>
              <CategoryListToolbar store={store} toolBarHandlers={toolBarHandlers} />
            </Grid>
            <Grid item xs={11} className={'gridRow'}>
              <CategoryList
                categories={categories} 
                onThumbClick={handleThumbClick}
              />
            </Grid>
          </>
        )}
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
    </div>
  );
}

export default CategoryView;