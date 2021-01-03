import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FoodIconLarge } from '@core/components/Icons/FoodIcon';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
import RecipeDetails from '@recipes/mobile/components/RecipeDetails';
import RecipesList from '@recipes/mobile/components/RecipesList';
import RecipeFilters from '@recipes/mobile/components/RecipeFilters';
import getNationalityOptions from '@recipes/utils/getNationalityOptions';
import getCategoryOptions from '@recipes/utils/getCategoryOptions';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  content: {
    height: '91%',
    overflowY: 'auto',
    marginTop: '1em'
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
    background: '#cdd0cb',
    padding: '10em 8em'
  },
  filtersExit: {
    height: '100%',
    width: '25%'
  }
}));

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
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const nationalities = getNationalityOptions(recipes);
  const categories = getCategoryOptions(recipes);

  const toggleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen);
  }
  const handleSelectRecipe = (id) => () => {
    if (selectedRecipe !== id) {
      setSelectedRecipe(id);
    } else {
      setSelectedRecipe('');
    }
  }
  const handleSelectNationality = (e) => {
    setSelectedNationality(e.target.value);
  }
  const handleSelectCategory = (e, category) => {
    setSelectedCategory(category || '');
  }
  const handleTextFilterInput = (e) => {
    setTextFilter(e.target.value);
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
      <div className={classes.content}>
        {hasSelectedRecipe ? (
          <RecipeDetails 
            recipe={recipes[selectedRecipe]} 
            allItems={allItems} 
            availableItems={availableItems} 
            cart={cart} 
            addToCart={addToCart}
          />
        ) : (
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
        )}
      </div>
      <div 
        className={classes.filtersDrawer}
        style={{ right: filterMenuOpen ? '0%' : '-100%' }}
      >
        <div className={classes.filtersExit} onClick={toggleFilterMenuOpen} />
        <div className={classes.filtersContent}>
          <RecipeFilters 
            toggleFilterMenuOpen={toggleFilterMenuOpen}
            nationalityOptions={nationalities}
            categoryOptions={categories}
            selectedNationality={selectedNationality}
            onSelectNationality={handleSelectNationality}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            textFilter={textFilter}
            onTextFilterInput={handleTextFilterInput}
          />
        </div>
      </div>
    </div>
  )
}

export default RecipesMobileContainer;