import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, TextField, IconButton } from '@material-ui/core';
import Nationalities from '@recipes/components/Nationalities';
import CategoryFilter from '@recipes/components/CategoryFilter';
import RecipesList from '@recipes/components/RecipesList';
import EditRecipe from '@recipes/components/EditRecipe';
import RecipeDetails from '@recipes/components/RecipeDetails';
import AddIcon from '@material-ui/icons/Add';
import defaultRecipeData from '@recipes/utils/defaultRecipeData';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    overflow: 'hidden'
  },
  primaryContainer: {
    transition: 'width 300ms',
    height: '100%',
    overflowY: 'auto',
    padding: '0 2em'
  },
  secondaryContainer: {
    transition: 'width 300ms',
    height: '100%',
    overflowY: 'auto',
    paddingRight: '2em'
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em'
  },
  rightFilters: {
    display: 'flex'
  },
  contentContainer: {
    display: 'flex',
    height: '90%',
    transition: 'width 300ms'
  }
}));

const getCategoryOptions = (recipes) => {
  const categories = [];
  Object.keys(recipes).map(recipeId => {
    const { category } = recipes[recipeId];
    if (!categories.includes(category)) {
      categories.push(category);
    }
  })
  return categories;
}

const RecipesContainer = (props) => {
  const classes = useStyles();

  const {
    recipes,
    availableItems, 
    allItems, 
    cart,
    ...actions
  } = props;

  const {
    addRecipe,
    editRecipe,
    removeRecipe,
    addToAllItems,
    addToCart
  } = actions;

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [selectedNationality, setSelectedNationality] = React.useState('All');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [textFilter, setTextFilter] = React.useState('');
  const [newRecipe, setNewRecipe] = React.useState(false);
  const [editRecipeData, setEditRecipeData] = React.useState(defaultRecipeData);

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const categories = getCategoryOptions(recipes);

  const handleSelectRecipe = (id) => () => {
    if (selectedRecipe !== id) {
      setSelectedRecipe(id);
    } else {
      setSelectedRecipe('');
    }
  }
  const handleSelectNationality = (nationality) => () => {
    setSelectedNationality(nationality);
  }
  const handleSelectCategory = (category) => {
    setSelectedCategory(category || '');
  }
  const handleTextFilterInput = (e) => {
    setTextFilter(e.target.value);
  }
  const toggleNewRecipe = () => {
    setNewRecipe(!newRecipe)
  }
  const handleSubmitEditRecipe = () => {
    addRecipe(editRecipeData);
  }

  return (
    <Paper className={classes.container}>
      <div className={classes.filtersContainer}>
        <Nationalities 
          recipes={recipes}
          selectedNationality={selectedNationality}
          onSelectNationality={handleSelectNationality}
        />
        <div className={classes.rightFilters}>
          <CategoryFilter
            recipes={recipes}
            categoryOptions={categories}
            onChange={handleSelectCategory}
          />
          <TextField
            style={{ width: '160px' }}
            value={textFilter}
            onChange={handleTextFilterInput}
            variant="outlined"
            size="small"
            placeholder="Name Filter"
          />
          <IconButton onClick={toggleNewRecipe}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.contentContainer}>
        <div 
          className={classes.primaryContainer}
          style={{ width: hasSelectedRecipe || newRecipe ? '60%' : '100%' }}
        >
          <RecipesList 
            recipes={recipes}
            selectedNationality={selectedNationality}
            selectedCategory={selectedCategory}
            selectedRecipe={selectedRecipe}
            textFilter={textFilter}
            onSelectRecipe={handleSelectRecipe}
            availableItems={availableItems}
            cart={cart}
            addToCart={addToCart}
          />
        </div>
        <div 
          className={classes.secondaryContainer} 
          style={{ width: hasSelectedRecipe || newRecipe ? '40%' : '0%' }}
        >
          {newRecipe ? (
            <EditRecipe 
              editRecipeData={editRecipeData}
              setEditRecipeData={setEditRecipeData}
              categoryOptions={categories}
              allItems={allItems}
              onSubmitEditRecipe={handleSubmitEditRecipe}
            />
          ) : (
            <RecipeDetails 
              recipe={recipes[selectedRecipe]}
              allItems={allItems}
              availableItems={availableItems}
              cart={cart}
              addToCart={addToCart}
            />
          )}
        </div>
      </div>
    </Paper>
  )
}

export default RecipesContainer;