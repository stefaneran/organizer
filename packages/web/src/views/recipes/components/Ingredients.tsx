import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ItemTag from 'recipes/components/ItemTag';
import { Ingredient } from 'recipes/types';
import { GroceryItemEdit } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  mobileText: {
    '& span': {
      fontSize: '3em'
    },
    '& p': {
      fontSize: '2em'
    }
  },
  ingredient: {
    
  },
  alternative: {
    marginLeft: '2em'
  }
}));

interface Props {
  ingredients: Ingredient[];
  groceries: Record<string, GroceryItemEdit>;
  inventory: string[];
  cart: string[];
  addCart: (itemIds: string[]) => void;
  isMobile?: boolean;
}

const Ingredients: React.FC<Props> = ({ 
  ingredients, 
  groceries, 
  inventory, 
  cart,
  addCart,
  isMobile 
}: Props) => {
  const classes = useStyles();

  const handleAddMissing = (itemId) => () => addCart([itemId]);

  return (
    <List>
      {ingredients.map((ingredient) => (
        <React.Fragment key={ingredient.itemId}>
          <ListItem className={classes.ingredient}>
            <ItemTag 
              ingredient={ingredient}
              inventory={inventory}
              cart={cart}
              onAddMissing={handleAddMissing(ingredient.itemId)}
              style={{ marginRight: '1.5em' }}
              isMobile={isMobile}
            />
            <ListItemText 
              primary={groceries[ingredient.itemId] ? groceries[ingredient.itemId].name : ''} 
              secondary={ingredient.amount}
              className={isMobile ? classes.mobileText : ''}
            />
          </ListItem>
          {ingredient?.alternatives?.length ? ingredient.alternatives.map((alternative, subIndex) => (
            <ListItem className={classes.alternative} key={`${alternative.itemId}-${subIndex}`}>
              <ItemTag 
                ingredient={alternative}
                inventory={inventory}
                cart={cart}
                onAddMissing={handleAddMissing(alternative.itemId)}
                style={{ marginRight: '1.5em' }}
                isMobile={isMobile}
              />
              <ListItemText 
                primary={groceries[alternative.itemId] ? groceries[alternative.itemId].name : ''} 
                secondary={alternative.amount}
                className={isMobile ? classes.mobileText : ''}
              />
            </ListItem>
          )) : null}
        </React.Fragment>
      ))}
    </List>
  )
}

export default Ingredients;
