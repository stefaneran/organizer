import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { connector, ReduxProps, DispatchProps } from 'recipes/container/RecipesConnector';
// Components
import RecipesToolbar from 'recipes/components/RecipesToolbar';
import RecipeFilters from 'recipes/components/RecipeFilters';
import RecipeItem from 'recipes/components/RecipeItem';
import RecipeInfoEdit from 'recipes/components/RecipeInfoEdit';
import RecipeInfo from 'recipes/components/RecipeInfo';
import ConfirmationDialog from '@core/components/ConfirmationDialog'; 
import SlidingPanel from '@core/components/SlidingPanel';
// Utils
import getMissingIngredients from 'recipes/utils/getMissingIngredients';
import defaultRecipeProps from 'recipes/utils/defaultRecipeProps';
import defaultRecipeFilters from 'recipes/utils/defaultRecipeFilters';
import getRecipesArray from 'recipes/utils/getRecipesArray';
import getNationalityOptions from 'recipes/utils/getNationalityOptions';
import getCategoryOptions from 'recipes/utils/getCategoryOptions';
// Types
import { RecipeEdit, EditMode } from 'recipes/types';

const useStyles = makeStyles(() => createStyles({
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

// Get text for confirmation dialog
const getConfirmationDialogDescription = (action, props) => {
  const { recipes, selectedRecipe, missingOptionals } = props;
  if (action === "Delete") {
    return `Are you sure you want to delete ${selectedRecipe.length && recipes[selectedRecipe].name}?`
  } else {
    const missing = missingOptionals.reduce((acc, ing) => acc += `(${ing.name}) `, '');
    const description = `The following optional ingredients are missing: ${missing} Would you like to add them to cart as well?`
    return description;
  }
}

const RecipesContainer: React.FC<ReduxProps & DispatchProps> = ({
  loggedIn,
  recipes,
  groceries, 
  inventory, 
  cart,
  ...actions
}) => {
  const classes = useStyles();

  const [selectedRecipe, setSelectedRecipe] = React.useState('');
  const [recipeFilters, setRecipeFilters] = React.useState(defaultRecipeFilters);
  const [isFiltersOpen, setFiltersOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState<EditMode>('');
  const [recipeData, setRecipeData] = React.useState(defaultRecipeProps);
  const [missingPrimaryIngredients, setMissingPrimary] = React.useState([])
  const [missingOptionalIngredients, setMissingOptional] = React.useState([])
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);
  const [onConfirmationAction, setOnConfirmationAction] = React.useState(null);
  const [confirmationText, setConfirmationText] = React.useState('');

  const hasSelectedRecipe = Boolean(selectedRecipe.length);

  const nationalities = React.useMemo(() => 
    getNationalityOptions(recipes), 
    [recipes]
  )
  const categories = React.useMemo(() => 
    getCategoryOptions(recipes), 
    [recipes]
  );
  const filteredRecipes = React.useMemo(() => 
    getRecipesArray(recipes, recipeFilters, inventory), 
    [recipes, recipeFilters]
  );

  React.useEffect(() => {
    if (loggedIn) {
      actions.getRecipes();
    }
  }, [loggedIn])

  const openConfirmationDialog = (action: "Delete" | "Optional") => () => {
    setOnConfirmationAction(action);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const { itemId } = ingredient;
        const { name } = groceries[itemId];
        return { ...ingredient, name };
      })
      recipe.ingredients = ingredients;
      setRecipeData(recipe);
    }
    setEditMode(mode);
  }
  const handleSubmitEditRecipe = () => {
    if (editMode === 'new') {
      actions.addRecipe(recipeData);
    } else if (editMode === 'edit') {
      actions.editRecipe(recipeData, selectedRecipe);
    }
    setEditMode('');
  }
  const handleDeleteRecipe = () => {
    actions.deleteRecipe(selectedRecipe);
    setSelectedRecipe('');
    openConfirmationDialog(null)()
  }
  const handleAddMissing = (ingredients = []) => () => {
    const { missingIngredients, missingOptionals } = getMissingIngredients(ingredients, inventory, cart);
    if (missingOptionals.length) {
      const text = getConfirmationDialogDescription(onConfirmationAction, {recipes, selectedRecipe, missingOptionals})
      setConfirmationText(text);
      openConfirmationDialog("Optional")();
      setMissingPrimary(missingIngredients);
      setMissingOptional(missingOptionals.map(ing => ing.itemId));
    } else {
      actions.addCart(missingIngredients);
    }
  }
  const handleAddMissingPrimary = () => {
    actions.addCart(missingPrimaryIngredients);
    openConfirmationDialog(null)();
  }
  const handleAddMissingOptionals = () => {
    actions.addCart([...missingOptionalIngredients, ...missingPrimaryIngredients]);
    openConfirmationDialog(null)();
  }

  return (
    <Paper className={classes.container}>
      <RecipesToolbar
        recipeFilters={recipeFilters}
        nationalityOptions={nationalities}
        categoryOptions={categories}
        toggleFiltersOpen={toggleFiltersOpen}
        onOpenEditRecipe={handleOpenEditRecipe}
        onChangeFilter={handleChangeFilter}
      />
      <div className={classes.contentContainer}>
        <div 
          className={classes.primaryContainer}
          style={{ width: hasSelectedRecipe || editMode.length ? '50%' : '100%' }}
        >
          {filteredRecipes.map(recipe => (
            <RecipeItem
              key={recipe.id}
              recipeId={recipe.id}
              recipe={recipe}
              selectedRecipe={selectedRecipe}
              onSelectRecipe={handleSelectRecipe}
              onAddMissing={handleAddMissing(recipe.ingredients)}
              inventory={inventory}
              cart={cart}
            />
          ))}
        </div>
        <div 
          className={classes.secondaryContainer} 
          style={{ width: hasSelectedRecipe || editMode.length ? '50%' : '0%' }}
        >
          {editMode.length ? (
            <RecipeInfoEdit
              recipeData={recipeData}
              setRecipeData={setRecipeData}
              categoryOptions={categories}
              groceries={groceries}
              onSubmitEditRecipe={handleSubmitEditRecipe}
              onOpenEditRecipe={handleOpenEditRecipe}
            />
          ) : (
            <RecipeInfo 
              recipe={recipes[selectedRecipe]}
              groceries={groceries}
              inventory={inventory}
              cart={cart}
              addCart={actions.addCart}
              onAddMissing={handleAddMissing(recipes[selectedRecipe]?.ingredients)}
              onOpenEditRecipe={handleOpenEditRecipe}
              onSelectRecipe={handleSelectRecipe}
              onDeleteRecipe={openConfirmationDialog("Delete")}
            />
          )}
        </div>
      </div>
      <SlidingPanel
        isOpen={isFiltersOpen}
        onClose={toggleFiltersOpen}
        direction="left"
        width={30}
      >
        <RecipeFilters
          recipeFilters={recipeFilters}
          categoryOptions={categories} 
          nationalityOptions={nationalities}
          onChangeFilter={handleChangeFilter}
        />
      </SlidingPanel>
      {isConfirmationOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={openConfirmationDialog(null)}
          confirmationTitle={
            onConfirmationAction === 'Delete' ? 
              'Confirm To Delete Recipe' :
              'Missing Optional Ingredients'
          }
          confirmationText={confirmationText}
          primaryText={
            onConfirmationAction === 'Delete' ?
              "Cancel" :
              "Add Optionals"
          }
          secondaryText={
            onConfirmationAction === 'Delete' ?
              "Delete" :
              "Add Primary Only"
          }
          onPrimaryAction={
            onConfirmationAction === 'Delete' ?
              openConfirmationDialog(null) :
              handleAddMissingOptionals
          }
          onSecondaryAction={
            onConfirmationAction === 'Delete' ?
              handleDeleteRecipe :
              handleAddMissingPrimary
          }
        />
      )}
    </Paper>
  )
}

export default connector(RecipesContainer);