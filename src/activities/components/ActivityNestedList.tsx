import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItemIcon, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ActivityListItem from '@activities/components/ActivityListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ActivityTypeIcon from '@activities/components/ActivityTypeIcon';
import categorizeItems from '@core/utils/categorizeItems';
import genericSort from '@core/utils/genericSort';

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    paddingLeft: '1.5em'
  },
  activityIcon: {
    minWidth: '35px'
  }
}));

const shouldBeOpen = (textFilter, participantFilter) => {
  if (textFilter && textFilter.length || participantFilter !== 'All') {
    return true;
  } 
  return false;
}

interface Props {
  listItems;
  onSelectActivity: (id: string) => () => void;
  textFilter;
  participantFilter;
}

const Collapsible = ({
  activityType, 
  items,
  textFilter,
  participantFilter,
  onSelectActivity
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(shouldBeOpen(textFilter, participantFilter));

  React.useEffect(() => {
    setIsOpen(shouldBeOpen(textFilter, participantFilter));
  }, [textFilter, participantFilter]);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <ListItem button onClick={toggleOpen}>
        <ListItemIcon className={classes.activityIcon}>
          <ActivityTypeIcon activityType={activityType} />
        </ListItemIcon>
        <ListItemText primary={activityType} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" className={classes.item}>
          {items && items.sort((a, b) => genericSort(a.name, b.name)).map(item => 
            <ActivityListItem key={item.id} item={item} onSelectActivity={onSelectActivity} />
          )}
        </List>
      </Collapse>
    </>
  )
}

const ActivityNestedList = ({ 
  listItems,
  textFilter,
  participantFilter,
  onSelectActivity
}: Props) => {
  const activityTypes = React.useMemo(() => categorizeItems(listItems, "activityType"), [listItems]);
  return (
    <List component="div" disablePadding>
      {activityTypes && Object.keys(activityTypes).sort((a, b) => genericSort(a, b)).map(activityType => (
        <Collapsible 
          key={activityType}
          activityType={activityType} 
          items={activityTypes[activityType]}
          textFilter={textFilter}
          participantFilter={participantFilter}
          onSelectActivity={onSelectActivity}
        />
      ))}
    </List>
  )
}

export default ActivityNestedList;