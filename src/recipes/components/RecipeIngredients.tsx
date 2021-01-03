import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ItemTag from '@recipes/components/ItemTag';

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
  ingredients;
  allItems;
  availableItems;
  cart;
  isMobile?: boolean;
}

const RecipeIngredients = ({ 
  ingredients, 
  allItems, 
  availableItems, 
  cart, 
  isMobile 
}: Props) => {
  const classes = useStyles();
  return (
    <List>
      {ingredients.map(ingredient => (
        <ListItem>
          <ItemTag 
            ingredient={ingredient.itemId}
            availableItems={availableItems}
            cart={cart}
            style={{ marginRight: '1.5em' }}
            isMobile={isMobile}
          />
          <ListItemText 
            primary={allItems[ingredient.itemId].name} 
            secondary={ingredient.amount}
            className={isMobile && classes.mobileText}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default RecipeIngredients;
