import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { FoodIconXS } from '@core/components/Icons/FoodIcon';
import IngredientsEdit from 'recipes/components/IngredientsEdit';
import countries from '@core/data/countries';
import { IngredientEdit, RecipeEdit, EditMode } from 'recipes/types';
import { InventoryItemEdit } from 'inventory/types';
import { InputEvent, AutoCompleteHandler } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    width: '100%',
    paddingBottom: '1.5em'
  },
  input: {
    marginBottom: '1em'
  },
  finishButtonContainer: {
    marginTop: '1em',
    textAlign: 'center'
  },
  finishButton: {
    marginRight: '1em'
  }
}))

interface Props {
  recipeData: RecipeEdit; 
  setRecipeData: (recipe: RecipeEdit) => void; 
  categoryOptions: string[]; 
  allItems: Record<string, InventoryItemEdit>;
  onSubmitEditRecipe: () => void;
  onOpenEditRecipe: (mode: EditMode) => () => void;
}

const RecipeInfoEdit: React.FC<Props> = ({
  recipeData, 
  setRecipeData, 
  categoryOptions, 
  allItems,
  onSubmitEditRecipe,
  onOpenEditRecipe
}) => {
  const classes = useStyles();

  const handleDataChange = (property: string, value: string | IngredientEdit[]) => {
    setRecipeData({
      ...recipeData,
      [property]: value
    })
  }
  const handleNameChange = (event: InputEvent) => {
    handleDataChange('name', event.target.value);
  }
  const handleNationalityChange: AutoCompleteHandler = (event, newValue) => {
    handleDataChange('nationality', newValue ? newValue : '');
  }
  const handleCategoryChange: AutoCompleteHandler = (event, newValue) => {
    handleDataChange('category', newValue ? newValue : '');
  }
  // This is needed separately for new typed categories that don't exist as an option
  const handleCategoryInput = (event: InputEvent) => {
    handleDataChange('category', event.target.value);
  }
  const handleInstructionsChange = (event: InputEvent) => {
    handleDataChange('instructions', event.target.value);
  }
  const handleIngredientsChange = (index: number, ingredient?: IngredientEdit) => {
    let ingredients = [ ...recipeData.ingredients ];
    // If ingredient is undefined, delete the sent index
    if (!ingredient) {
      ingredients = ingredients.filter((ing, i) => i !== index);
    } else {
      ingredients[index] = { 
        ...ingredient,
        name: ingredient.name || ''
      };
    }
    handleDataChange('ingredients', ingredients);
  }

  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        value={recipeData.name}
        onChange={handleNameChange}
        variant="outlined"
        size="small"
        placeholder="Recipe Name"
        fullWidth
      />
      <Autocomplete
        className={classes.input}
        value={recipeData.nationality}
        options={countries.map(c => c.name)}
        onChange={handleNationalityChange}
        getOptionLabel={(option) => option}
        renderInput={(params) => 
          <TextField 
            {...params}
            label="Nationality"  
            size="small" 
            variant="outlined" 
            fullWidth
          />
        }
      />
      <Autocomplete
        className={classes.input}
        value={recipeData.category}
        options={categoryOptions}
        onChange={handleCategoryChange}
        getOptionLabel={(option) => option}
        noOptionsText={<></>}
        renderInput={(params) => 
          <TextField 
            {...params}
            onChange={handleCategoryInput} 
            label="Category"  
            size="small" 
            variant="outlined" 
            fullWidth
          />
        }
      />
      <TextField
        className={classes.input}
        value={recipeData.instructions}
        onChange={handleInstructionsChange}
        variant="outlined"
        size="small"
        placeholder="Instructions"
        fullWidth
        multiline
        rows={12}
      />
      <IngredientsEdit 
        ingredients={recipeData.ingredients} 
        allItems={allItems}
        onIngredientsChange={handleIngredientsChange}
      />
      <div className={classes.finishButtonContainer}>
        <Button
          className={classes.finishButton}
          variant="outlined" 
          color="primary"
          onClick={onSubmitEditRecipe}
          endIcon={<FoodIconXS />}
        >
          Finish
        </Button>
        <Button
          variant="outlined" 
          color="secondary"
          onClick={onOpenEditRecipe('')}
          endIcon={<CloseIcon />}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default RecipeInfoEdit;
