import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { FilterListIconLarge } from 'core/components/Icons/ListIcon';
import SelectInput from 'core/components/inputs/SelectInput';
import { RecipeFilters } from 'recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  mobileSelect: {
    marginBottom: '100px',
    fontSize: '3rem'
  },
  label: {
    fontSize: '3em',
    marginBottom: '0.5em'
  },
  navRight: {
    position: 'absolute',
    right: '3em',
    top: '2em'
  },
}));

interface Props {
  recipeFilters: RecipeFilters
  nationalityOptions: string[];
  categoryOptions: string[];
  toggleFilterMenuOpen: () => void;
  onChangeFilter: (property: string) => (eventOrValue: any) => void;
}

const RecipesFilters: React.FC<Props> = ({
  recipeFilters,
  nationalityOptions,
  categoryOptions,
  toggleFilterMenuOpen,
  onChangeFilter
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.navRight} onClick={toggleFilterMenuOpen}>
        <FilterListIconLarge />
      </div>
      <InputLabel className={classes.label}>Nationality</InputLabel>
      <SelectInput
        className={classes.mobileSelect}
        value={recipeFilters.nationality}
        options={['All', ...nationalityOptions]}
        onChange={onChangeFilter('nationality')}
        label="Nationalities"
        fullWidth
      />
      <InputLabel className={classes.label}>Category</InputLabel>
      <SelectInput
        className={classes.mobileSelect}
        value={recipeFilters.category}
        options={['All', ...categoryOptions]}
        onChange={onChangeFilter('category')}
        label="Categories"
        fullWidth
      />
    </>
  )
}

export default RecipesFilters;