import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ItemTag from '@recipes/components/ItemTag';
import { Ingredient } from '@recipes/types';
import { InventoryItem } from '@inventory/types';
import { ClickEvent } from '@core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  cart: string[];
  onAddMissing: (ingredientName: string) => (event: ClickEvent) => void;
  isMobile?: boolean;
}

const Ingredients: React.FC<Props> = ({ 
  ingredients, 
  allItems, 
  availableItems, 
  cart, 
  onAddMissing,
  isMobile 
}: Props) => {
  const classes = useStyles();
  return (
    <List>
      {ingredients.map((ingredient) => (
        <React.Fragment key={ingredient.itemId}>
          <ListItem className={classes.ingredient}>
            <ItemTag 
              ingredient={ingredient}
              availableItems={availableItems}
              cart={cart}
              onAddMissing={onAddMissing(ingredient.itemId)}
              style={{ marginRight: '1.5em' }}
              isMobile={isMobile}
            />
            <ListItemText 
              primary={allItems[ingredient.itemId] ? allItems[ingredient.itemId].name : ''} 
              secondary={ingredient.amount}
              className={isMobile ? classes.mobileText : ''}
            />
          </ListItem>
          {ingredient?.alternatives?.length ? ingredient.alternatives.map((alternative, subIndex) => (
            <ListItem className={classes.alternative} key={`${alternative.itemId}-${subIndex}`}>
              <ItemTag 
                ingredient={alternative}
                availableItems={availableItems}
                cart={cart}
                onAddMissing={onAddMissing(alternative.itemId)}
                style={{ marginRight: '1.5em' }}
                isMobile={isMobile}
              />
              <ListItemText 
                primary={allItems[alternative.itemId] ? allItems[alternative.itemId].name : ''} 
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
