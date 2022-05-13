import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ActivitiesTypesListItem from 'activities/mobile/components/ActivitiesTypesListItem';
import { ActivityType } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '92%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  activitiesTypesList: ActivityType[];
  onSelect: (activityType?: ActivityType) => void;
}

const ActivitiesTypesList: React.FC<Props> = ({
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
          onSelect={onSelect}
        />
      ))}
    </List>
  )
}

export default ActivitiesTypesList;