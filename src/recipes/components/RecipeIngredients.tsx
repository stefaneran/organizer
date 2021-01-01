import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ItemTag from '@recipes/components/ItemTag';

const RecipeIngredients = ({ ingredients, allItems, availableItems, cart }) => {
  return (
    <List>
      {ingredients.map(ingredient => (
        <ListItem>
          <ItemTag 
            ingredient={ingredient.itemId}
            availableItems={availableItems}
            cart={cart}
            style={{ marginRight: '1.5em' }}
          />
          <ListItemText 
            primary={allItems[ingredient.itemId].name} 
            secondary={ingredient.amount}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default RecipeIngredients;
