import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { AddCartIconLarge } from '@core/components/Icons/CartIcon';
import checkMissingItemsRecipe from '@recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from '@recipes/utils/checkMissingInCartRecipe';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '0.7em',
    position: 'relative',
    marginBottom: '1em',
    cursor: 'pointer',
    boxShadow: '5px 4px 4px 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& .subtitle': {
      color: 'rgba(0, 0, 0, 0.54)',
    }
  },
  textContainer: {
    paddingLeft: '1em',
    textAlign: 'left'
  },
  cartButton: {
    position: 'absolute',
    right: '1em',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}));

const RecipeItem = ({ 
  recipeId, 
  recipe, 
  selectedRecipe, 
  onSelectRecipe,
  tag,
  availableItems,
  cart,
  addToCart
}) => {

  const classes = useStyles();
  const hasMissingItems = recipe && checkMissingItemsRecipe(recipe, availableItems);
  const hasMissingInCart = recipe && checkMissingInCartRecipe(recipe, availableItems, cart);

  const handleAddMissingToCart = (event) => {
    event.stopPropagation();
    const missing = [];
    recipe.ingredients.forEach(ingredient => {
      const { itemId } = ingredient;
      const shouldAdd = !availableItems.includes(itemId) && !cart.includes(itemId);
      if (shouldAdd) {
        missing.push(itemId)
      }
    });
    // Just a precaution, button should not be visible if this weren't the case
    if (missing.length) {
      addToCart(missing);
    }
  }

  return (
    <Paper 
      onClick={onSelectRecipe(recipeId)}
      className={classes.container}
    >
      {tag}
      <div className={classes.textContainer}>
        <Typography variant="h2">
          {recipe.name}
        </Typography>
        <Typography variant="h3" className={'subtitle'}>
          {`${recipe.nationality} - ${recipe.category}`}
        </Typography>
      </div>
      {hasMissingItems && !hasMissingInCart && (
        <IconButton className={classes.cartButton} onClick={handleAddMissingToCart}>
          <AddCartIconLarge />
        </IconButton>
      )}
    </Paper>
  )
}

export default RecipeItem;