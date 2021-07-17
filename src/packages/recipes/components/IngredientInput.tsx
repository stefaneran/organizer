import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { IconButton, TextField } from '@material-ui/core';
import { TrashIconXS } from 'core/components/Icons/DeleteIcon';
import getItemsOptions from 'recipes/utils/getItemsOptions';
import isAlternativeIngredient from 'recipes/utils/isAlternativeIngredient';
import { InventoryItem } from 'inventory/types';
import { IngredientEdit, AlternativeIngredientEdit } from 'recipes/types';
import { InputEvent, AutoCompleteHandler } from 'core/types';

const useStyles = makeStyles(() => createStyles({
  input: { 
    width: '35%', 
    marginRight: '1em' 
  },
  deleteButton: {
    padding: '0 7px'
  },
  amount: {
    maxWidth: '90px'
  }
}))

type Property = keyof AlternativeIngredientEdit;

interface OnChangeProps {
  index: number;
  subIndex?: number;
  property: Property;
  value: string;
}

interface Props {
  ingredient: IngredientEdit | AlternativeIngredientEdit;
  index: number;
  subIndex?: number;
  allItems: Record<string, InventoryItem>;
  onItemSelect: (index: number, subIndex?: number) => AutoCompleteHandler;
  onChange: (props: OnChangeProps) => void;
  onDelete?: (index: number, subIndex?: number) => () => void;
}

const isOptionSelected = (name) => (option) => option && name && option.toLowerCase() === name.toLowerCase()

const IngredientInput: React.FC<Props> = ({
  ingredient,
  index,
  subIndex,
  allItems,
  onItemSelect,
  onChange,
  onDelete
}) => {
  const classes = useStyles();

  const isAlternative = isAlternativeIngredient(ingredient);
  const isOptional = 'isOptional' in ingredient && ingredient.isOptional;
  const label = isAlternative ? "Alternative" : `${isOptional ? 'Optional' : ''} Ingredient`;
  
  const options = getItemsOptions(ingredient.name, allItems);

  const handleChange = (property: Property) => (event: InputEvent) => {
    const { value } = event.target;
    onChange({
      index, 
      subIndex,
      property, 
      value
    });
  }

  return (
    <>
      <Autocomplete
        className={classes.input}
        options={options}
        value={ingredient.name || ""}
        onChange={onItemSelect(index, subIndex)}
        getOptionLabel={(option) => option}
        getOptionSelected={isOptionSelected(ingredient.name)}
        noOptionsText={<></>}
        renderInput={(params) => 
          <TextField 
            {...params}
            onChange={handleChange('name')} 
            label={label}
            size="small" 
            variant="outlined" 
            fullWidth
          />
        }
      />
      <TextField
        className={clsx(classes.input, classes.amount)}
        value={ingredient.amount}
        onChange={handleChange('amount')}
        label="Amount"
        variant="outlined"
        size="small"
        placeholder="ex: grams/tablespoons/ml"
        fullWidth
      />
      {isAlternative && onDelete ? (
        <IconButton 
          onClick={onDelete(index, subIndex)} 
          className={classes.deleteButton}
        >
          <TrashIconXS />
        </IconButton>
      ) : null}
    </>
  )
}

export default IngredientInput;