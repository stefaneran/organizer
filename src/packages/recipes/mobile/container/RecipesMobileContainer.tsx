import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import { connector, ReduxProps } from './index';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FoodIconLarge } from 'core/components/Icons/FoodIcon';
import { FilterListIconLarge } from 'core/components/Icons/ListIcon';
// Components
import RecipeInfo from 'recipes/mobile/components/RecipeInfo';
import RecipeItem from 'recipes/mobile/components/RecipeItem';
import RecipeFilters from 'recipes/mobile/components/RecipeFilters';
// Utils
import getMissingIngredients from 'recipes/utils/getMissingIngredients';
import defaultRecipeFilters from 'recipes/utils/defaultRecipeFilters';
import getNationalityOptions from 'recipes/utils/getNationalityOptions';
import getCategoryOptions from 'recipes/utils/getCategoryOptions';
import getRecipesArray from 'recipes/utils/getRecipesArray';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff',
    padding: '1.5em',
    position: 'relative'
  },
  navRight: {
    position: 'absolute',
    right: '3em'
  },
  arrowIcon: {
    width: '4em', 
    height: '4em', 
    position: 'relative', 
    top: '2em', 
    color: '#3f51b5'
  },
  header: {
    textAlign: 'center'
  },
  mobileTextField: {
    marginTop: '20px',
    '& > div': {
      fontSize: '3rem'
    }
  },
  contentContainer: {
    height: '80%',
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: '1em',
    position: 'relative'
  },
  contentWindow: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    transition: 'left 300ms',
    padding: '1.5em'
  },
  filtersDrawer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    transition: 'right 300ms'
  },
  filtersContent: {
    height: '100%',
    width: '75%',
    background: '#ecedf0',
    padding: '14em 8em'
  },
  filtersExit: {
    height: '100%',
    width: '25%'
  }
}));

const RecipesMobileContainer: React.FC<ReduxProps> = ({
  recipes,
  availableItems, 
  allItems, 
  cart,
  addToCart
}) => {
  const classes = useStyles();

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [recipeFilters, setRecipeFilters] = React.useState(defaultRecipeFilters);
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const nationalities = React.useMemo(() => getNationalityOptions(recipes), [recipes]);
  const categories = React.useMemo(() => getCategoryOptions(recipes), [recipes]);

  const filteredRecipes = React.useMemo(() => getRecipesArray(recipes, recipeFilters), [recipes, recipeFilters]);
  
  const toggleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen);
  }
  const handleSelectRecipe = (id: string) => () => {
    if (selectedRecipe !== id) {
      setSelectedRecipe(id);
    } else {
      setSelectedRecipe('');
    }
  }
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
    setRecipeFilters({
      ...recipeFilters,
      [property]: value
    })
  }
  const handleAddMissing = (ingredients = []) => () => {
    const missing = getMissingIngredients(ingredients, availableItems, cart);
    addToCart(missing);
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h1">
          Recipes
        </Typography>
        <div 
          className={classes.navRight} 
          style={{ top: hasSelectedRecipe ? '-1em' : '2em' }}
          onClick={hasSelectedRecipe ? handleSelectRecipe(selectedRecipe) : toggleFilterMenuOpen}
        >
          {hasSelectedRecipe ? (
            <>
              <ChevronLeftIcon className={classes.arrowIcon} />
              <FoodIconLarge />
            </>
          ) : (
            <FilterListIconLarge />
          )}
        </div>
      </div>
      <TextField
        value={recipeFilters.name}
        onChange={handleChangeFilter('name')}
        className={classes.mobileTextField}
        variant="outlined"
        size="medium"
        placeholder="Name Filter"
        fullWidth
      />
      <div className={classes.contentContainer}>
        <div className={classes.contentWindow} style={{ left: hasSelectedRecipe ? '0%' : '100%' }}>
          <RecipeInfo 
            recipe={recipes[selectedRecipe]} 
            allItems={allItems} 
            availableItems={availableItems} 
            cart={cart} 
            addToCart={addToCart}
            onAddMissing={handleAddMissing(recipes[selectedRecipe]?.ingredients)}
          />
        </div>
        <div className={classes.contentWindow} style={{ left: hasSelectedRecipe ? '-100%' : '0%'}}>
          {filteredRecipes.map(recipe => (
            <RecipeItem
              key={recipe.id}
              recipeId={recipe.id}
              recipe={recipe}
              onSelectRecipe={handleSelectRecipe}
              availableItems={availableItems}
              cart={cart}
              onAddMissing={handleAddMissing(recipe.ingredients)}
            />
          ))}
        </div>
      </div>
      <div 
        className={classes.filtersDrawer}
        style={{ right: filterMenuOpen ? '0%' : '-100%' }}
      >
        <div className={classes.filtersExit} onClick={toggleFilterMenuOpen} />
        <div className={classes.filtersContent}>
          <RecipeFilters 
            recipeFilters={recipeFilters}
            nationalityOptions={nationalities}
            categoryOptions={categories}
            toggleFilterMenuOpen={toggleFilterMenuOpen}
            onChangeFilter={handleChangeFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default connector(RecipesMobileContainer);