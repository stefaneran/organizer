import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SelectInput from '@core/components/inputs/SelectInput';
import { RecipeFilters } from '@recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0',
    padding: '0 2em 0 2em'
  },
  topButtons: {
    textAlign: 'right'
  },
  input: {
    marginTop: '1em',
    width: '100%'
  }
}));

interface Props {
  isOpen: boolean;
  recipeFilters: RecipeFilters;
  categoryOptions: string[]; 
  onChangeFilter: (property: string) => (eventOrValue: any) => void; 
  onClose: () => void;
}

const RecipesFilters: React.FC<Props> = ({
  isOpen,
  recipeFilters,
  categoryOptions, 
  onChangeFilter,
  onClose
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <TextField
        style={{ width: '160px', marginRight: '1em' }}
        value={recipeFilters.name}
        onChange={onChangeFilter('name')}
        variant="outlined"
        size="small"
        placeholder="Name Filter"
      />
      <SelectInput
        value={recipeFilters.category}
        options={['All', ...categoryOptions]}
        onChange={onChangeFilter('category')}
        label="Category"
      />
    </div>
  )
}

export default RecipesFilters;