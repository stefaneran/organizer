import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import { connector, ReduxProps } from './RecipesMobileConnector';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FoodIconLarge } from '@core/components/Icons/FoodIcon';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
// Components
import RecipeInfo from 'recipes/mobile/components/RecipeInfo';
import RecipeItem from 'recipes/mobile/components/RecipeItem';
import RecipeFilters from 'recipes/mobile/components/RecipeFilters';
// Utils
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
import getMissingIngredients from 'recipes/utils/getMissingIngredients';
import defaultRecipeFilters from 'recipes/utils/defaultRecipeFilters';
import getNationalityOptions from 'recipes/utils/getNationalityOptions';
import getCategoryOptions from 'recipes/utils/getCategoryOptions';
import getRecipesArray from 'recipes/utils/getRecipesArray';
// Types
import { OrganizerModule } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff',
    padding: '1.5em',
    position: 'relative'
  },
  header: {
    textAlign: 'center'
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
    padding: '10em 6em'
  },
  filtersExit: {
    height: '100%',
    width: '25%'
  }
}));

const RecipesMobileContainer: React.FC<ReduxProps> = ({
  loggedIn,
  lastUpdate,
  recipes,
  inventory, 
  groceries, 
  cart,
  getItems,
  getRecipes,
  addCart
}) => {
  const classes = useStyles();

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [recipeFilters, setRecipeFilters] = React.useState(defaultRecipeFilters);
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const nationalities = React.useMemo(() => getNationalityOptions(recipes), [recipes]);
  const categories = React.useMemo(() => getCategoryOptions(recipes), [recipes]);

  const filteredRecipes = React.useMemo(() => 
    getRecipesArray(recipes, recipeFilters, inventory), 
    [recipes, recipeFilters]
  );

  React.useEffect(() => {
    const isRecipeDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Recipes, lastUpdate);
    const isInventoryDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Inventory, lastUpdate);
    if (loggedIn) {
      if (!isRecipeDataUpToDate) {
        getRecipes();
      }
      if (!isInventoryDataUpToDate) {
        getItems();
      }
    }
  }, [loggedIn])
  
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
    setRecipeFilters({
      ...recipeFilters,
      [property]: value
    })
  }
  const handleAddMissing = (ingredients = []) => () => {
    const { missingIngredients } = getMissingIngredients(ingredients, inventory, cart);
    addCart(missingIngredients);
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
            groceries={groceries} 
            inventory={inventory} 
            cart={cart} 
            addCart={addCart}
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
              inventory={inventory}
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