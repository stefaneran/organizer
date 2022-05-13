import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import { List } from '@material-ui/core';
import ActivitiesListItem from 'activities/mobile/components/ActivitiesListItem';
// Utils
import getActivitiesArray from 'activities/utils/getActivitiesArray';
import getActivitiesOfType from 'activities/utils/getActivitiesOfType';
import getActivityLocations from 'activities/utils/getActivityLocations';
// Types
import { RootState } from '@core/types';
import { ActivityType, ActivityFilters } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '92%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  activityType: ActivityType | "Filter";
  activitiesFilters: ActivityFilters;
  onSelect: (activityId?: string) => void;
}

const ActivitiesList: React.FC<Props> = ({
  activityType,
  activitiesFilters,
  onSelect
}) => {
  const classes = useStyles();
  const { activities } = useSelector((state: RootState) => state.activitiesStore)

  const activitiesList = 
    React.useMemo(() => {
      // If no filters, render all activities of selected type
      if (activityType !== "Filter") {
        return getActivitiesOfType(activities, activityType)
      }
      // If filters present, show all activities of all types that match filter result 
      else {
        return getActivitiesArray(activities, activitiesFilters)
      }
    }, [activities, activityType, activitiesFilters])

  return (
    <List component="div" className={classes.container}>
      {activitiesList && activitiesList.map((activity) => (
        <ActivitiesListItem 
          key={activity.id} 
          activity={activity}
          locationsAmount={getActivityLocations(activities, activity.id).length}
          onSelect={onSelect}
        />
      ))}
    </List>
  )
}

export default ActivitiesList;