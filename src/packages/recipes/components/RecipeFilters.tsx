import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { 
  RemoveBagIconSmallFill,
  CheckBagIconSmallFill
} from '@core/components/Icons/BagIcon';
import SelectInput from '@core/components/inputs/SelectInput';
import SwitchInput from '@core/components/inputs/SwitchInput';
import getEnumValues from '@core/utils/getEnumValues';
import { RecipeFilters, GroupByMode } from 'recipes/types';

const useStyles = makeStyles(() => createStyles({
  input: {
    marginTop: '1em',
    width: '100%'
  },
  availableOnly: {
    marginTop: '1em',
    justifyContent: 'center',
    '& svg': {
      position: 'relative',
      top: '0.3em'
    }
  }
}));

interface Props {
  recipeFilters: RecipeFilters;
  categoryOptions: string[]; 
  nationalityOptions: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeFilter: (property: string) => (eventOrValue: any) => void;
}

const RecipesFilters: React.FC<Props> = ({
  recipeFilters,
  categoryOptions, 
  nationalityOptions,
  onChangeFilter
}) => {
  const classes = useStyles();

  return (
    <>
      <SelectInput
        className={classes.input}
        value={recipeFilters.groupBy}
        options={getEnumValues(GroupByMode)}
        onChange={onChangeFilter('groupBy')}
        label="Group By"
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
        />
      ) : null}
      {recipeFilters.groupBy !== GroupByMode.Nationality ? (
        <SelectInput
          className={classes.input}
          value={recipeFilters.nationality}
          options={['All', ...nationalityOptions]}
          onChange={onChangeFilter('nationality')}
          label="Nationality"
        />
      ) : null}
      <div style={{ textAlign: 'center' }}>
        <SwitchInput
          isChecked={recipeFilters.availableOnly}
          onChange={onChangeFilter('availableOnly')}
          className={classes.availableOnly}
          uncheckedIcon={<RemoveBagIconSmallFill />}
          checkedIcon={<CheckBagIconSmallFill />}
        />
      </div>
    </>
  )
}

export default RecipesFilters;