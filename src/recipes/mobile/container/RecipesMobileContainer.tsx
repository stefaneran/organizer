import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FoodIconLarge } from '@core/components/Icons/FoodIcon';
import RecipesList from '@recipes/mobile/components/RecipesList';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff',
    padding: '1.5em'
  },
  header: {
    textAlign: 'center'
  },
  navRight: {
    position: 'absolute',
    right: '3em',
    top: '-1em'
  },
  arrowIcon: {
    width: '4em', 
    height: '4em', 
    position: 'relative', 
    top: '2em', 
    color: '#3f51b5'
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

const RecipesMobileContainer = (props) => {
  const classes = useStyles();

  const {
    recipes,
    availableItems, 
    allItems, 
    cart,
    ...actions
  } = props;

  const { addToCart } = actions;

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [selectedNationality, setSelectedNationality] = React.useState('All');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [textFilter, setTextFilter] = React.useState('');
  const [editRecipeMode, setEditRecipeMode] = React.useState('');

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const categories = getCategoryOptions(recipes);

  const handleSelectRecipe = (id) => () => {
    if (selectedRecipe !== id) {
      if (editRecipeMode.length) {
        setEditRecipeMode('');
      }
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

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant={hasSelectedRecipe ? 'h2' : 'h1'}>
          {hasSelectedRecipe ? recipes[selectedRecipe].name : 'Recipes'}
        </Typography>
        {hasSelectedRecipe && (
          <div 
            className={classes.navRight} 
            onClick={handleSelectRecipe(selectedRecipe)}
          >
            <>
              <ChevronLeftIcon className={classes.arrowIcon} />
              <FoodIconLarge />
            </>
          </div>
        )}
      </div>
      <div style={{ height: '95%' }}>
        <RecipesList
          recipes={recipes}
          selectedNationality={selectedNationality}
          selectedCategory={selectedCategory}
          selectedRecipe={selectedRecipe}
          onSelectRecipe={handleSelectRecipe} 
          textFilter={textFilter}
          availableItems={availableItems}
          cart={cart}
          addToCart={addToCart}
        />
      </div>
    </div>
  )
}

export default RecipesMobileContainer;