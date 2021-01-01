import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core';
import { FoodIconXS } from '@core/components/Icons/FoodIcon';
import { TrashIconSmall } from '@core/components/Icons/DeleteIcon';
import Nationalities from '@recipes/components/Nationalities';
import CategoryFilter from '@recipes/components/CategoryFilter';
import RecipesList from '@recipes/components/RecipesList';
import EditRecipe from '@recipes/components/EditRecipe';
import RecipeDetails from '@recipes/components/RecipeDetails';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';
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
    paddingRight: '1em',
    paddingLeft: '2em'
  },
  secondaryContainer: {
    transition: 'width 300ms',
    height: '100%',
    overflowY: 'auto',
    paddingRight: '2em',
    paddingLeft: '1em'
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em 1em 0 1em'
  },
  rightFilters: {
    display: 'flex'
  },
  contentContainer: {
    display: 'flex',
    height: '88%',
    transition: 'width 300ms',
    paddingTop: '1em'
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
    addToCart
  } = actions;

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [selectedNationality, setSelectedNationality] = React.useState('All');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [textFilter, setTextFilter] = React.useState('');
  const [editRecipeMode, setEditRecipeMode] = React.useState('');
  const [editRecipeData, setEditRecipeData] = React.useState(defaultRecipeData);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const categories = getCategoryOptions(recipes);

  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
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
  const handleOpenEditRecipe = (mode) => () => {
    setEditRecipeMode(mode);
    if (mode === 'new') {
      setEditRecipeData(defaultRecipeData)
    } 
    // Map existing recipe's data to state hook
    else if (mode === 'edit') {
      const recipe = { ...recipes[selectedRecipe] };
      const ingredients = recipe.ingredients.map(ingredient => {
        const { itemId, amount } = ingredient;
        const { name } = allItems[itemId];
        return { name, amount };
      })
      recipe.ingredients = ingredients;
      setEditRecipeData(recipe);
    }
  }
  const handleSubmitEditRecipe = () => {
    setEditRecipeMode('');
    if (editRecipeMode === 'new') {
      addRecipe(editRecipeData);
    } else if (editRecipeMode === 'edit') {
      editRecipe(editRecipeData, selectedRecipe);
    }
  }
  const handleRemoveRecipe = () => {
    removeRecipe(selectedRecipe);
    setSelectedRecipe('');
    toggleConfirmationDialog()
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
            style={{ width: '160px', marginRight: '1em' }}
            value={textFilter}
            onChange={handleTextFilterInput}
            variant="outlined"
            size="small"
            placeholder="Name Filter"
          />
          <Button 
            style={{ height: '40px' }}
            onClick={handleOpenEditRecipe('new')}
            variant="outlined"
            color="primary"
            endIcon={<FoodIconXS />}
          >
            New
          </Button>
        </div>
      </div>
      <div className={classes.contentContainer}>
        <div 
          className={classes.primaryContainer}
          style={{ width: hasSelectedRecipe || editRecipeMode.length ? '60%' : '100%' }}
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
          style={{ width: hasSelectedRecipe || editRecipeMode.length ? '40%' : '0%' }}
        >
          {editRecipeMode.length ? (
            <EditRecipe
              editRecipeData={editRecipeData}
              setEditRecipeData={setEditRecipeData}
              categoryOptions={categories}
              allItems={allItems}
              onSubmitEditRecipe={handleSubmitEditRecipe}
              onOpenEditRecipe={handleOpenEditRecipe}
            />
          ) : (
            <RecipeDetails 
              recipe={recipes[selectedRecipe]}
              allItems={allItems}
              availableItems={availableItems}
              cart={cart}
              addToCart={addToCart}
              onOpenEditRecipe={handleOpenEditRecipe}
              onSelectRecipe={handleSelectRecipe}
              onDeleteRecipe={toggleConfirmationDialog}
            />
          )}
        </div>
      </div>
      {isConfirmationOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={'Confirm To Delete Recipe'}
          confirmationText={`Are you sure you want to delete ${selectedRecipe.length && recipes[selectedRecipe].name}?`}
          secondaryIcon={<TrashIconSmall />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={handleRemoveRecipe}
        />
      )}
    </Paper>
  )
}

export default RecipesContainer;