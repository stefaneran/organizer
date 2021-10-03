import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { IconButton, Button, Checkbox, Tooltip } from '@material-ui/core';
// Icons
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// Components
import IngredientInput from 'recipes/components/IngredientInput'
// Utils
import assignValueToAlternative from 'recipes/utils/assignValueToAlternative';
// Types
import { IngredientEdit } from 'recipes/types';
import { InventoryItemEdit } from 'inventory/types';
import { AutoCompleteHandler } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  inputGroup: {
    display: 'flex',
    marginBottom: '0.5em'
  },
  inputGroupSub: {
    display: 'flex',
    marginBottom: '1em',
    marginLeft: '2em'
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
  },
  amount: {
    maxWidth: '90px'
  }
}))

interface Props {
  ingredients: IngredientEdit[]; 
  allItems: Record<string, InventoryItemEdit>; 
  onIngredientsChange: (index: number, ingredient?: IngredientEdit) => void;
}

const IngredientsEdit: React.FC<Props> = ({ 
  ingredients, 
  allItems, 
  onIngredientsChange
}) => {
  const classes = useStyles();

  const handleItemSelect = (index: number, subIndex?: number): AutoCompleteHandler => (event, newValue: string) => {
    let ingredient: IngredientEdit;
    // If item was selected on an alt ingredient
    if (subIndex !== undefined) {
      ingredient = assignValueToAlternative(ingredients, index, subIndex, "name", newValue);
    }
    else {
      ingredient = { 
        ...ingredients[index], 
        name: newValue
      };
    }
    onIngredientsChange(index, ingredient);
  }
  const handleChange = ({ index, property, value }) => {
    const ingredient = { 
      ...ingredients[index], 
      [property]: value
    };
    onIngredientsChange(index, ingredient);
  }
  const handleChangeAlt = ({ index, subIndex, property, value }) => {
    const ingredient = assignValueToAlternative(ingredients, index, subIndex, property, value);
    onIngredientsChange(index, ingredient);
  }
  // TypeScript conflict: <Checkbox /> doesn't think it returns event with target.checked, but it does
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheck = (index: number) => (event: any) => {
    const ingredient = { 
      ...ingredients[index], 
      isOptional: event.target.checked
    };
    onIngredientsChange(index, ingredient);
  }
  const handleDeleteIngredient = (index: number, subIndex?: number) => () => {
    if (subIndex !== undefined) {
      const oldAlternatives = ingredients[index].alternatives;
      const ingredient = {
        ...ingredients[index],
        alternatives: oldAlternatives.filter((alt, i) => i !== subIndex)
      }
      onIngredientsChange(index, ingredient);
    } else {
      onIngredientsChange(index);
    }
  }
  const handleAddIngredient = () => {
    const newIngredient: IngredientEdit = { 
      name: '', 
      amount: '', 
      isOptional: false,
      alternatives: []
    };
    onIngredientsChange(ingredients.length, newIngredient);
  }
  const handleAddAlt = (index: number) => () => {
    const ingredient = ingredients[index];
    const oldAlternatives = ingredient?.alternatives ?? [];
    const newAlt = { name: '', amount: '' };
    const updatedIngredient = {
      ...ingredient,
      alternatives: [...oldAlternatives, newAlt]
    }
    onIngredientsChange(index, updatedIngredient);
  }

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <React.Fragment key={index}>
          <div className={classes.inputGroup}>
            <IngredientInput 
              ingredient={ingredient}
              index={index}
              allItems={allItems}
              onItemSelect={handleItemSelect}
              onChange={handleChange}
            />
            <Tooltip title="Is Ingredient Optional">
              <Checkbox
                edge="start"
                checked={ingredient.isOptional || false}
                onClick={handleCheck(index)}
                color="primary"
              />
            </Tooltip>
            <Tooltip title="Add Alternative Ingredient">
              <IconButton onClick={handleAddAlt(index)}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </Tooltip>
            {index !== 0 && (
              <IconButton 
                onClick={handleDeleteIngredient(index)} 
                className={classes.deleteButton}
              >
                <TrashIconXS />
              </IconButton>
            )}
          </div>
          {ingredient?.alternatives?.length ? ingredient.alternatives.map((alternative, subIndex) => (
            <div 
              key={`${index}-${subIndex}`} 
              className={classes.inputGroupSub}
            >
              <IngredientInput 
                ingredient={alternative}
                index={index}
                subIndex={subIndex}
                allItems={allItems}
                onItemSelect={handleItemSelect}
                onChange={handleChangeAlt}
                onDelete={handleDeleteIngredient}
              />
            </div>
          )) : null}
        </React.Fragment>
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

export default IngredientsEdit;