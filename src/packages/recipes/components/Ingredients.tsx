import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ItemTag from '@recipes/components/ItemTag';
import { Ingredient } from '@recipes/types';
import { InventoryItem } from '@inventory/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  mobileText: {
    '& span': {
      fontSize: '3em'
    },
    '& p': {
      fontSize: '2em'
    }
  }
}));

interface Props {
  ingredients: Ingredient[];
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  cart: string[];
  isMobile?: boolean;
}

const Ingredients: React.FC<Props> = ({ 
  ingredients, 
  allItems, 
  availableItems, 
  cart, 
  isMobile 
}: Props) => {
  const classes = useStyles();
  return (
    <List>
      {ingredients.map(({ itemId, amount }) => (
        <ListItem>
          <ItemTag 
            ingredient={itemId}
            availableItems={availableItems}
            cart={cart}
            style={{ marginRight: '1.5em' }}
            isMobile={isMobile}
          />
          <ListItemText 
            primary={allItems[itemId] ? allItems[itemId].name : ''} 
            secondary={amount}
            className={isMobile ? classes.mobileText : ''}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default Ingredients;
