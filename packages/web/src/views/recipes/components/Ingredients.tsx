import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { addCart } from 'inventory/store/thunks';
// Components
import { List, ListItem, ListItemText } from '@material-ui/core';
import ItemTag from 'recipes/components/ItemTag';
// Types
import { RootState, AppDispatch } from '@core/types';
import { Ingredient } from 'recipes/types';

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
  isMobile?: boolean;
}

const Ingredients: React.FC<Props> = ({ 
  ingredients,
  isMobile 
}: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groceries } = useSelector((state: RootState) => state.inventoryStore); 

  const handleAddMissing = (itemId) => () => dispatch(addCart([itemId]));

  return (
    <List>
      {ingredients.map((ingredient) => (
        <React.Fragment key={ingredient.itemId}>
          <ListItem className={classes.ingredient}>
            <ItemTag 
              ingredient={ingredient}
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
