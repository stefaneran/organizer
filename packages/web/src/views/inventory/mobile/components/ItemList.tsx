import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
// Utils
import genericSort from '@core/utils/genericSort';
// Types
import { GroceryItem, RowIcon } from 'inventory/types';
import { ClickEvent, RootState } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  checkbox: {
    marginRight: '2em',
    '& svg': {
      width: '2.5em',
      height: '2.5em'
    }
  },
  text: {
    '& span': {
      fontSize: '3.5em'
    },
    '& p': {
      fontSize: '2.5em'
    }
  }
}));

interface Props {
  listItems: GroceryItem[];
  rowIcons: RowIcon[];
  onItemSelection?: (selected: string[]) => void;
}

const ItemList: React.FC<Props> = ({ 
  listItems,  
  rowIcons,
  onItemSelection
}) => {
  const classes = useStyles();
  const { cartSelected } = useSelector((state: RootState) => state.inventoryStore);

  const hasSelection = Boolean(cartSelected);

  const handleSelection = (id: string) => () => {
    if (cartSelected && onItemSelection) {
      const newSelected = cartSelected.includes(id) ? cartSelected.filter(itemId => itemId !== id) : [...cartSelected, id]
      onItemSelection(newSelected);
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleIconAction = (id: string, handler: Function) => (event: ClickEvent) => {
    event.stopPropagation();
    handler(id);
  }

  return (
    <List component="div">
      {listItems && listItems.sort((a, b) => genericSort(a.category, b.category)).map(item => (
        <ListItem 
          key={item.id}
          button 
          onClick={hasSelection ? handleSelection(item.id) : undefined}
        >
          {hasSelection ? (
            <ListItemIcon>
              <Checkbox
                className={classes.checkbox}
                edge="start"
                checked={cartSelected && cartSelected.includes(item.id)}
                color="primary"
              />
            </ListItemIcon>
          ) : null}
          <ListItemText className={classes.text} primary={item.name} secondary={item.category} />
          {rowIcons && rowIcons.map((rowIcon, index) => (
            <ListItemIcon 
              style={{ marginRight: '2.5em' }}
              key={`${item.id}-${index}`} 
              onClick={handleIconAction(item.id, rowIcon.handler)}
            >
              {rowIcon.icon}
            </ListItemIcon>
          ))}
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList;