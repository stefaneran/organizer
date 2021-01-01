import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { AddCartIconSmall, AddCartIconSmallWhite } from '@core/components/Icons/CartIcon';
import checkMissingItemsRecipe from '@recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from '@recipes/utils/checkMissingInCartRecipe';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '0.7em',
    position: 'relative',
    marginBottom: '1em',
    cursor: 'pointer',
    transition: 'background 300ms, color 300ms',
    boxShadow: '5px 4px 4px 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& .subtitle': {
      color: 'rgba(0, 0, 0, 0.54)',
      transition: 'color 300ms',
    },
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff',
      '& .subtitle': {
        color: '#fff',
      }
    }
  },
  selected: {
    background: theme.palette.primary.main,
    color: '#fff',
    '& .subtitle': {
      color: '#fff',
    },
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
  const isSelected = selectedRecipe === recipeId;
  const hasMissingItems = recipe && checkMissingItemsRecipe(recipe, availableItems);
  const hasMissingInCart = recipe && checkMissingInCartRecipe(recipe, availableItems, cart);

  const handleAddMissingToCart = (e) => {
    e.stopPropagation();
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
      className={isSelected ? clsx(classes.container, classes.selected) : classes.container}
    >
      {tag}
      <div className={classes.textContainer}>
        <Typography variant="h6">
          {recipe.name}
        </Typography>
        <Typography variant="subtitle2" className={'subtitle'}>
          {`${recipe.nationality} - ${recipe.category}`}
        </Typography>
      </div>
      {hasMissingItems && !hasMissingInCart && (
        <IconButton className={classes.cartButton} onClick={handleAddMissingToCart}>
          {isSelected ? (
            <AddCartIconSmallWhite />
          ) : (
            <AddCartIconSmall />
          )}
        </IconButton>
      )}
    </Paper>
  )
}

export default RecipeItem;