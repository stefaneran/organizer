import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import ChipsGroup from '@core/components/ChipsGroup';
// Utils
import capitalizeString from '@core/utils/capitalizeString';
import defaultActivityFilters from 'activities/utils/defaultActivityFilters';
// Types
import { ActivityFilters } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    '& > div': {
      transform: 'scale(2)',
      marginLeft: '18em',
      marginTop: '3em'
    }
  }
}));

const getChipTitles = (activitiesFilters) => {
  const titles = [];
  Object.entries(activitiesFilters).forEach(([property, value]) => {
    if (value !== defaultActivityFilters[property]) {
      titles.push(`${capitalizeString(property)}: ${value}`)
    }
  })
  return titles;
}

interface Props {
  activitiesFilters: ActivityFilters;
}

// TODO add X icon to remove a filter
const ActivitiesFiltersChips: React.FC<Props> = ({
  activitiesFilters
}) => {
  const classes = useStyles();

  const titles = getChipTitles(activitiesFilters);

  return (
    <div className={classes.container}>
      <ChipsGroup 
        options={titles}
        selectedOption={''}
        allBlue
      />
    </div>
  )
}

export default ActivitiesFiltersChips;