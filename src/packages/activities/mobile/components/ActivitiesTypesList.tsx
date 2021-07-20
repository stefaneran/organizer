import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ActivitiesTypesListItem from 'activities/mobile/components/ActivitiesTypesListItem';
import getNumOfActivities from 'activities/utils/getNumOfActivities';
import { ActivityType, Activity } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '92%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  activities: Record<string, Activity>;
  activitiesTypesList: ActivityType[];
  onSelect: (activityType?: ActivityType) => void;
}

const ActivitiesTypesList: React.FC<Props> = ({ 
  activities,
  activitiesTypesList,
  onSelect
}) => {
  const classes = useStyles();
  return (
    <List component="div" className={classes.container}>
      {activitiesTypesList && activitiesTypesList.map(activityType => (
        <ActivitiesTypesListItem 
          key={activityType} 
          activityType={activityType}
          activitiesAmount={getNumOfActivities(activities, activityType)}
          onSelect={onSelect}
        />
      ))}
    </List>
  )
}

export default ActivitiesTypesList;