import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import SelectInput from '@core/components/inputs/SelectInput';
import { NutritionalInfo } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  input: {
    maxWidth: '100px'
  }
}));

interface Props {
  row: NutritionalInfo;
  index: number;
  onChange: (property: string, index: number) => (eventOrValue) => void;
  onRemoveRow: (index: number) => () => void;
}

const NutritionEditRow: React.FC<Props> = ({ row, index, onChange, onRemoveRow }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SelectInput
        value={row.unit}
        options={['units', 'grams', 'milliliters', 'teaspoons', 'tablespoons']}
        onChange={onChange('unit', index)}
        label="Unit"
      />
      <TextField 
        className={classes.input}
        value={row.amount} 
        variant="outlined"
        label="Amount" 
        onChange={onChange('amount', index)}
        type="number"
      />
      <TextField 
        className={classes.input}
        value={row.calories} 
        variant="outlined"
        label="Calories (kcal)" 
        onChange={onChange('calories', index)}
        type="number"
      />
      <TextField 
        className={classes.input}
        value={row.proteins} 
        variant="outlined"
        label="Proteins (g)" 
        onChange={onChange('proteins', index)}
        type="number"
      />
      <TextField 
        className={classes.input}
        value={row.fat} 
        variant="outlined"
        label="Fat (g)" 
        onChange={onChange('fat', index)}
        type="number"
      />
      {index > 0 ? (
        <IconButton onClick={onRemoveRow(index)}>
          <TrashIconXS />
        </IconButton>
      ) : null}
    </div>
  )
}

export default NutritionEditRow;