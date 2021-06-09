import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
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
  const [selectedCategory, setSelectedCategory] = React.useState('All');
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
  const handleSelectNationality = (event) => {
    setSelectedNationality(event.target.value);
  }
  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  }
  const handleTextFilterInput = (event) => {
    setTextFilter(event.target.value);
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
        value={textFilter}
        onChange={handleTextFilterInput}
        className={classes.mobileTextField}
        variant="outlined"
        size="medium"
        placeholder="Name Filter"
        fullWidth
      />
      <div className={classes.contentContainer}>
        <div className={classes.contentWindow} style={{ left: hasSelectedRecipe ? '0%' : '100%' }}>
          <RecipeDetails 
            recipe={recipes[selectedRecipe]} 
            allItems={allItems} 
            availableItems={availableItems} 
            cart={cart} 
            addToCart={addToCart}
          />
        </div>
        <div className={classes.contentWindow} style={{ left: hasSelectedRecipe ? '-100%' : '0%'}}>
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
          />
        </div>
      </div>
    </div>
  )
}

export default RecipesMobileContainer;