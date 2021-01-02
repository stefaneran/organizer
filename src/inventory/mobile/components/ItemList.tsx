import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import genericSort from '@core/utils/genericSort';

const useStyles = makeStyles((theme: Theme) => createStyles({
  checkbox: {
    marginRight: '1em',
    '& svg': {
      width: '1.5em',
      height: '1.5em'
    }
  },
  text: {
    '& span': {
      fontSize: '1.5em'
    },
    '& p': {
      fontSize: '1.2em'
    }
  }
}));

interface Props {
  listItems;
  selectedItems?;
  onItemSelection?;
  iconActions?;
}

const ItemList = ({ 
  listItems, 
  selectedItems, 
  onItemSelection,
  iconActions
}: Props) => {
  const classes = useStyles();
  const hasSelection = Boolean(selectedItems);

  const handleSelection = (id) => () => {
    const newSelected = 
      selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : 
        [...selectedItems, id]
    onItemSelection(newSelected);
  }

  const handleIconAction = (id, handler) => (e) => {
    e.stopPropagation();
    handler(id);
  }

  return (
    <List component="div">
      {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(item => (
        <ListItem 
          key={item.id}
          button 
          onClick={hasSelection && handleSelection(item.id)}
        >
          {hasSelection && (
            <ListItemIcon>
              <Checkbox
                className={classes.checkbox}
                edge="start"
                checked={selectedItems.includes(item.id)}
                color="primary"
              />
            </ListItemIcon>
          )}
          <ListItemText className={classes.text} primary={item.name} secondary={item.category} />
          {iconActions && iconActions.map((iconAction, index) => (
            <ListItemIcon key={`${item.id}-${index}`} onClick={handleIconAction(item.id, iconAction.handler)}>
              {iconAction.icon}
            </ListItemIcon>
          ))}
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList;