import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import categorizeItems from '@inventory/utils/categorizeItems';

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    paddingLeft: '1.5em'
  },
}))

const Collapsible = ({ category, items }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <ListItem button onClick={toggleOpen}>
        {/*
        <ListItemIcon>
            TODO: Add dynamic icons 
        </ListItemIcon>
        */}
        <ListItemText primary={category} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" className={classes.item}>
          {items && items.map(item => (
            <ListItem button>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

const NestedList = ({ items }) => {
  const categories = categorizeItems(items);

  return (
    <List component="div" disablePadding>
      {categories && Object.keys(categories).map(category => (
        <Collapsible category={category} items={categories[category]} />
      ))}
    </List>
  )
}

export default NestedList;