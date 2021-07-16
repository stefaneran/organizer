import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import genericSort from 'core/utils/genericSort';
import { InventoryItem, RowIcon } from 'inventory/types';
import { ClickEvent } from 'core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  listItems: InventoryItem[];
  selectedItems?: string[];
  onItemSelection?: (selected: string[]) => void;
  rowIcons: RowIcon[];
}

const ItemList: React.FC<Props> = ({ 
  listItems, 
  selectedItems, 
  onItemSelection,
  rowIcons
}: Props) => {
  const classes = useStyles();
  const hasSelection = Boolean(selectedItems);

  const handleSelection = (id: string) => () => {
    if (selectedItems && onItemSelection) {
      const newSelected = selectedItems.includes(id) ? selectedItems.filter(itemId => itemId !== id) : [...selectedItems, id]
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
                checked={selectedItems && selectedItems.includes(item.id)}
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