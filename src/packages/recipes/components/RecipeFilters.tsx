import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SelectInput from '@core/components/inputs/SelectInput';
import { RecipeFilters, GroupByMode } from '@recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '30%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'left 300ms',
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
  nationalityOptions: string[];
  onChangeFilter: (property: string) => (eventOrValue: any) => void; 
  onClose: () => void;
}

const RecipesFilters: React.FC<Props> = ({
  isOpen,
  recipeFilters,
  categoryOptions, 
  nationalityOptions,
  onChangeFilter,
  onClose
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sidepanel} style={{ left: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <SelectInput
        className={classes.input}
        value={recipeFilters.groupBy}
        options={Object.keys(GroupByMode)}
        onChange={onChangeFilter('groupBy')}
        label="Group By"
        fullWidth
      />
      <TextField
        className={classes.input}
        value={recipeFilters.name}
        onChange={onChangeFilter('name')}
        variant="outlined"
        placeholder="Name Filter"
        fullWidth
      />
      {recipeFilters.groupBy !== GroupByMode.Category ? (
        <SelectInput
          className={classes.input}
          value={recipeFilters.category}
          options={['All', ...categoryOptions]}
          onChange={onChangeFilter('category')}
          label="Category"
          fullWidth
        />
      ) : null}
      {recipeFilters.groupBy !== GroupByMode.Nationality ? (
        <SelectInput
          className={classes.input}
          value={recipeFilters.nationality}
          options={['All', ...nationalityOptions]}
          onChange={onChangeFilter('nationality')}
          label="Nationality"
          fullWidth
        />
      ) : null}
    </div>
  )
}

export default RecipesFilters;