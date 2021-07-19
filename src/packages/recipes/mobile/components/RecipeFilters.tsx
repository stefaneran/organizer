import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
import SelectInput from '@core/components/inputs/SelectInput';
import { RecipeFilters } from 'recipes/types';

const useStyles = makeStyles(() => createStyles({
  mobileSelect: {
    width: '100%',
    fontSize: '3em',
    '& > div': {
      fontSize: '1em'
    },
    '& option': {
      fontSize: '1rem'
    }
  },
  label: {
    fontSize: '3em',
    marginTop: '0.7em',
    marginBottom: '0.3em'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        native
        className={classes.mobileSelect}
        value={recipeFilters.nationality}
        options={['All', ...nationalityOptions]}
        onChange={onChangeFilter('nationality')}
      />
      <InputLabel className={classes.label}>Category</InputLabel>
      <SelectInput
        native
        className={classes.mobileSelect}
        value={recipeFilters.category}
        options={['All', ...categoryOptions]}
        onChange={onChangeFilter('category')}
      />
    </>
  )
}

export default RecipesFilters;