import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { CategoryList } from '@components/CategoryList';
import { ChooseCategoryDialog } from '@components/Dialogs/ChooseCategoryDialog';
import { CreateCategoryWizard } from '@components/Wizards/CreateCategoryWizard';
import { getCategories } from '@store/accessors';
// import categoriesMock from '@mocks/categories.mock';

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

  const [history, setHistory] = React.useState('/main');

  const { addCategoryThunk, saveDataThunk } = store;
  const categories = store.profiles && getCategories(store);

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

  return (
    <Grid container className={classes.container}>
      <Paper>
        <Grid container direction="column" style={{ height: '100%' }}>

          <Route exact path={`/main/`}>
            <Grid id="category_actions" item container direction="row" xs={1}>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={handleOpenChooseCategory}>Add New</Button>
              </Grid>
            </Grid>
            <Grid item xs>
              <CategoryList 
                history={history} 
                setHistory={setHistory} 
                categories={categories} 
              />
            </Grid>
          </Route>

          <Route path={`/main/:name`}>
            <span>Nested ID</span>
          </Route>
          
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