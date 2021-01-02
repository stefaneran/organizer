import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Divider, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { FoodIconXS } from '@core/components/Icons/FoodIcon';
import EditIngredients from '@recipes/components/EditIngredients';
import countries from '@core/data/countries';

const useStyles = makeStyles((theme: Theme) => createStyles({
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

const EditRecipe = ({
  editRecipeData, 
  setEditRecipeData, 
  categoryOptions, 
  allItems,
  onSubmitEditRecipe,
  onOpenEditRecipe
}) => {
  const classes = useStyles();

  const handleDataChange = (property, value) => {
    setEditRecipeData({
      ...editRecipeData,
      [property]: value
    })
  }
  const handleNameChange = (e) => {
    handleDataChange('name', e.target.value);
  }
  const handleNationalityChange = (e, newValue) => {
    handleDataChange('nationality', newValue ? newValue : '');
  }
  const handleCategoryChange = (e, newValue) => {
    handleDataChange('category', newValue ? newValue : '');
  }
  // This is needed separately for new typed categories that don't exist as an option
  const handleCategoryInput = (e) => {
    handleDataChange('category', e.target.value);
  }
  const handleInstructionsChange = (e) => {
    handleDataChange('instructions', e.target.value);
  }
  const handleIngredientsChange = (index, ingredient) => {
    let ingredients = [ ...editRecipeData.ingredients ];
    // If ingredient is undefined, delete the sent index
    if (!ingredient) {
      ingredients = ingredients.filter((ing, i) => i !== index);
    } else {
      ingredients[index] = { 
        name: ingredient.name || '', 
        amount: ingredient.amount 
      };
    }
    handleDataChange('ingredients', ingredients);
  }

  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        value={editRecipeData.name}
        onChange={handleNameChange}
        variant="outlined"
        size="small"
        placeholder="Recipe Name"
        fullWidth
      />
      <Autocomplete
        className={classes.input}
        value={editRecipeData.nationality}
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
        value={editRecipeData.category}
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
        value={editRecipeData.instructions}
        onChange={handleInstructionsChange}
        variant="outlined"
        size="small"
        placeholder="Instructions"
        fullWidth
        multiline
        rows={12}
      />
      <EditIngredients 
        ingredients={editRecipeData.ingredients} 
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

export default EditRecipe;
