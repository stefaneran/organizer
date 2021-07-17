import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItemIcon, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ActivityListItem from 'activities/components/ActivityListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ActivityTypeIcon from 'activities/components/ActivityTypeIcon';
import categorizeItems from 'core/utils/categorizeItems';
import genericSort from 'core/utils/genericSort';
import { Activity, ActivityFilters, ActivityType } from 'activities/types';
import { ClickEvent } from 'core/types';

const useStyles = makeStyles(() => createStyles({
  item: {
    paddingLeft: '1.5em'
  },
  activityIcon: {
    minWidth: '35px'
  }
}));

// If any filters are active, and this category exists, it means the main filter 
// already captured some relevant items, so this should be open by default
const shouldBeOpen = ({ name, participants }: ActivityFilters): boolean => {
  if (name && name.length || participants !== 'All') {
    return true;
  } 
  return false;
}

interface CollapsibleProps {
  activityType: string; // Will be ActivityType
  activities: Activity[];
  activityFilters: ActivityFilters;
  selectedActivity: string;
  onOpenInfo: (activityId?: string) => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  activityType, 
  activities,
  activityFilters,
  selectedActivity,
  onOpenInfo
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(shouldBeOpen(activityFilters));

  React.useEffect(() => {
    setIsOpen(shouldBeOpen(activityFilters));
  }, [activityFilters]);

  const toggleOpen = (event: ClickEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemIcon className={classes.activityIcon}>
          <ActivityTypeIcon activityType={activityType as ActivityType} />
        </ListItemIcon>
        <ListItemText primary={activityType} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" className={classes.item}>
          {activities && activities.sort((a, b) => genericSort(a.name, b.name)).map(activity => 
            <ActivityListItem 
              key={activity.id}
              activity={activity}
              isSelected={selectedActivity === activity.id}
              onOpenInfo={onOpenInfo} 
            />
          )}
        </List>
      </Collapse>
    </>
  )
}

interface NestedProps {
  activitiesList: Activity[];
  activityFilters: ActivityFilters;
  selectedActivity: string;
  onOpenInfo: (activityId?: string) => void;
}

const ActivityNestedList: React.FC<NestedProps> = ({ 
  activitiesList,
  activityFilters,
  selectedActivity,
  onOpenInfo
}) => {

  const categorizedActivities = 
    React.useMemo(() => 
      categorizeItems(activitiesList, "activityType"), 
      [activitiesList]
    );

  return (
    <List component="div" disablePadding>
      {categorizedActivities && 
        Object
          .keys(categorizedActivities)
          .sort((a, b) => genericSort(a, b))
          .map(activityType => (
            <Collapsible 
              key={activityType}
              activityType={activityType} 
              activities={categorizedActivities[activityType]}
              activityFilters={activityFilters}
              selectedActivity={selectedActivity}
              onOpenInfo={onOpenInfo}
            />
          ))
      }
    </List>
  )
}

export default ActivityNestedList;