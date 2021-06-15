import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
// Components
import RecipesToolbar from '@recipes/components/RecipesToolbar';
import RecipeFilters from '@recipes/components/RecipeFilters';
import RecipeItem from '@recipes/components/RecipeItem';
import ItemTag from '@recipes/components/ItemTag';
import RecipeInfoEdit from '@recipes/components/RecipeInfoEdit';
import RecipeInfo from '@recipes/components/RecipeInfo';
import ConfirmationDialog from '@core/components/ConfirmationDialog'; 
// Utils
import defaultRecipeProps from '@recipes/utils/defaultRecipeProps';
import defaultRecipeFilters from '@recipes/utils/defaultRecipeFilters';
import filterRecipes from '@recipes/utils/filterRecipes';
import getNationalityOptions from '@recipes/utils/getNationalityOptions';
import getCategoryOptions from '@recipes/utils/getCategoryOptions';
// Types
import { InventoryItem } from '@inventory/types';
import { Recipe, RecipeEdit, RecipeActions, EditMode } from '@recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    overflow: 'hidden',
    position: 'relative'
  },
  contentContainer: {
    display: 'flex',
    height: '88%',
    transition: 'width 300ms',
    paddingTop: '1em'
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
  rightFilters: {
    display: 'flex'
  }
}));

interface Props {
  recipes: Record<string, Recipe>;
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  cart: string[];
}

const RecipesContainer: React.FC<Props & RecipeActions> = ({
  recipes,
  allItems, 
  availableItems, 
  cart,
  ...actions
}) => {
  const classes = useStyles();

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [recipeFilters, setRecipeFilters] = React.useState(defaultRecipeFilters);
  const [isFiltersOpen, setFiltersOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState<EditMode>('');
  const [recipeData, setRecipeData] = React.useState(defaultRecipeProps);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const nationalities = React.useMemo(() => getNationalityOptions(recipes), [recipes])
  const categories = React.useMemo(() => getCategoryOptions(recipes), [recipes]);

  const filteredRecipes = React.useMemo(() => filterRecipes(recipes, recipeFilters), [recipes, recipeFilters]);

  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  const toggleFiltersOpen = () => {
    setFiltersOpen(!isFiltersOpen);
  }
  const handleSelectRecipe = (id: string) => () => {
    if (selectedRecipe !== id) {
      if (editMode.length) {
        setEditMode('');
      }
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
  const handleOpenEditRecipe = (mode: EditMode) => () => {
    if (mode === 'new') {
      setRecipeData(defaultRecipeProps)
    } 
    // Map existing recipe's data to state hook, and adapt ingredient type (see IngredientEdit interface)
    else if (mode === 'edit') {
      const recipe: RecipeEdit = { 
        ...recipes[selectedRecipe], 
        ingredients: [] 
      };
      const ingredients = recipes[selectedRecipe].ingredients.map(ingredient => {
        const { itemId, amount } = ingredient;
        const { name } = allItems[itemId];
        return { name, amount };
      })
      recipe.ingredients = ingredients;
      setRecipeData(recipe);
    }
    setEditMode(mode);
  }
  const handleSubmitEditRecipe = () => {
    setEditMode('');
    if (editMode === 'new') {
      actions.addRecipe(recipeData);
    } else if (editMode === 'edit') {
      actions.editRecipe(recipeData, selectedRecipe);
    }
  }
  const handleDeleteRecipe = () => {
    actions.deleteRecipe(selectedRecipe);
    setSelectedRecipe('');
    toggleConfirmationDialog()
  }

  return (
    <Paper className={classes.container}>
      <RecipesToolbar
        recipeFilters={recipeFilters}
        nationalities={nationalities}
        toggleFiltersOpen={toggleFiltersOpen}
        onOpenEditRecipe={handleOpenEditRecipe}
        onChangeFilter={handleChangeFilter}
      />
      <div className={classes.contentContainer}>
        <div 
          className={classes.primaryContainer}
          style={{ width: hasSelectedRecipe || editMode.length ? '60%' : '100%' }}
        >
          {filteredRecipes.map(recipe => (
            <RecipeItem
              key={recipe.id}
              recipeId={recipe.id}
              recipe={recipe}
              selectedRecipe={selectedRecipe}
              onSelectRecipe={handleSelectRecipe}
              availableItems={availableItems}
              cart={cart}
              addToCart={actions.addToCart}
              tag={
                <ItemTag 
                  recipe={recipe} 
                  availableItems={availableItems} 
                  cart={cart} 
                />
              }
            />
          ))}
        </div>
        <div 
          className={classes.secondaryContainer} 
          style={{ width: hasSelectedRecipe || editMode.length ? '40%' : '0%' }}
        >
          {editMode.length ? (
            <RecipeInfoEdit
              recipeData={recipeData}
              setRecipeData={setRecipeData}
              categoryOptions={categories}
              allItems={allItems}
              onSubmitEditRecipe={handleSubmitEditRecipe}
              onOpenEditRecipe={handleOpenEditRecipe}
            />
          ) : (
            <RecipeInfo 
              recipe={recipes[selectedRecipe]}
              allItems={allItems}
              availableItems={availableItems}
              cart={cart}
              addToCart={actions.addToCart}
              onOpenEditRecipe={handleOpenEditRecipe}
              onSelectRecipe={handleSelectRecipe}
              onDeleteRecipe={toggleConfirmationDialog}
            />
          )}
        </div>
      </div>
      <RecipeFilters
        isOpen={isFiltersOpen}
        recipeFilters={recipeFilters}
        categoryOptions={categories} 
        onChangeFilter={handleChangeFilter}
        onClose={toggleFiltersOpen}
      />
      {isConfirmationOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={'Confirm To Delete Recipe'}
          confirmationText={`Are you sure you want to delete ${selectedRecipe.length && recipes[selectedRecipe].name}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={handleDeleteRecipe}
        />
      )}
    </Paper>
  )
}

export default RecipesContainer;