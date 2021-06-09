import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField, IconButton, Button } from '@material-ui/core';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
  inputGroup: {
    display: 'flex',
    marginBottom: '0.5em'
  },
  input: { 
    width: '35%', 
    marginRight: '1em' 
  },
  deleteButton: {
    padding: '0 7px'
  },
  addButton: {
    marginTop: '0.5em'
  }
}))

const getItemsOptions = (ingredientName, allItems) => {
  const items = [];
  Object.keys(allItems).forEach(itemId => {
    const { name } = allItems[itemId];
    const containsValue = ingredientName.length ?
      name.toLowerCase().includes(ingredientName.toLowerCase()) : true;
    if (!items.includes(name) && containsValue) {
      items.push(name);
    }
  })
  return items;
}

const EditIngredients = ({ 
  ingredients, 
  allItems, 
  onIngredientsChange
}) => {
  const classes = useStyles();

  const handleItemSelect = (index) => (e, newValue) => {
    const ingredient = { 
      ...ingredients[index], 
      name: newValue
    };
    onIngredientsChange(index, ingredient);
  }
  const handleItemInput = (index) => (event) => {
    const ingredient = { 
      ...ingredients[index], 
      name: event.target.value 
    };
    onIngredientsChange(index, ingredient);
  }
  const handleAmountInput = (index) => (event) => {
    const ingredient = { 
      ...ingredients[index], 
      amount: event.target.value 
    };
    onIngredientsChange(index, ingredient);
  }
  const handleDeleteIngredient = (index) => () => {
    onIngredientsChange(index, undefined);
  }
  const handleAddIngredient = () => {
    onIngredientsChange(ingredients.length, { name: '', amount: '' });
  }

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={classes.inputGroup}>
          <Autocomplete
            className={classes.input}
            options={getItemsOptions(ingredient.name, allItems)}
            value={ingredient.name}
            onChange={handleItemSelect(index)}
            getOptionLabel={(option) => option}
            noOptionsText={<></>}
            renderInput={(params) => 
              <TextField 
                {...params}
                onChange={handleItemInput(index)} 
                label="Ingredient"  
                size="small" 
                variant="outlined" 
                fullWidth
              />
            }
          />
          <TextField
            className={classes.input}
            value={ingredient.amount}
            onChange={handleAmountInput(index)}
            label="Amount"
            variant="outlined"
            size="small"
            placeholder="ex: grams/tablespoons/ml"
            fullWidth
          />
          {index !== 0 && (
            <IconButton 
              onClick={handleDeleteIngredient(index)} 
              className={classes.deleteButton}
            >
              <TrashIconXS />
            </IconButton>
          )}
        </div>
      ))}
      <Button 
        onClick={handleAddIngredient}
        className={classes.addButton}
        color="primary" 
        variant="outlined"
      >
        Add Ingredient
      </Button>
    </div>
  )
}

export default EditIngredients;