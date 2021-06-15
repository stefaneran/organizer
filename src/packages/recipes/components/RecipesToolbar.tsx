import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NationalitiesChips from '@recipes/components/NationalitiesChips';
import { EditMode, RecipeFilters } from '@recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '1em 1em 0 1em'
  }
}));

interface Props {
  recipeFilters: RecipeFilters;
  nationalities: string[];
  toggleFiltersOpen: () => void;
  onOpenEditRecipe: (editMode: EditMode) => () => void;
  onChangeFilter: (property: string) => (eventOrValue: any) => void;
}

const RecipesToolbar: React.FC<Props> = ({
  recipeFilters,
  nationalities,
  toggleFiltersOpen,
  onOpenEditRecipe,
  onChangeFilter
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Tooltip title="Open Filters">
        <IconButton onClick={toggleFiltersOpen}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add New Contact">
        <IconButton onClick={onOpenEditRecipe('new')}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
      <NationalitiesChips 
        nationalityOptions={nationalities}
        selectedNationality={recipeFilters.nationality}
        onSelectNationality={onChangeFilter('nationality')}
      />
    </div>
  )
}

export default RecipesToolbar;