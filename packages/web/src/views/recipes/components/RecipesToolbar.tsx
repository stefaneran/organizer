import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChipsGroup from '@core/components/ChipsGroup';
import { EditMode, GroupByMode, RecipeFilters } from 'recipes/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    padding: '1em 1em 0 1em'
  }
}));

interface Props {
  recipeFilters: RecipeFilters;
  nationalityOptions: string[];
  categoryOptions: string[];
  toggleFiltersOpen: () => void;
  onOpenEditRecipe: (editMode: EditMode) => () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeFilter: (property: string) => (eventOrValue: any) => void;
}

const RecipesToolbar: React.FC<Props> = ({
  recipeFilters,
  nationalityOptions,
  categoryOptions,
  toggleFiltersOpen,
  onOpenEditRecipe,
  onChangeFilter
}) => {
  const classes = useStyles();

  let options = categoryOptions;
  let groupByFilter = 'category';
  let selectedOption = recipeFilters.category
  if (recipeFilters.groupBy === GroupByMode.Nationality) {
    options = nationalityOptions.filter(nat => nat !== 'Other');
    groupByFilter = 'nationality';
    selectedOption = recipeFilters.nationality
  }

  return (
    <div className={classes.container}>
      <Tooltip title="Open Filters">
        <IconButton onClick={toggleFiltersOpen}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add New Recipe">
        <IconButton onClick={onOpenEditRecipe('new')}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ChipsGroup 
        options={["All", ...options]}
        selectedOption={selectedOption}
        onSelect={onChangeFilter(groupByFilter)}
      />
    </div>
  )
}

export default RecipesToolbar;