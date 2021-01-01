import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { RemoveBagIconSmallFill, CheckBagIconSmallFill } from '@core/components/Icons/BagIcon';
import { WarningCartIconSmallFill } from '@core/components/Icons/CartIcon';
import checkMissingItemsRecipe from '@recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from '@recipes/utils/checkMissingInCartRecipe';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    borderStyle: 'solid', 
    borderWidth: '2px', 
    borderRadius: '50%', 
    padding: '0.4em',
    height: '2.6em',
    alignSelf: 'center',
    '& > svg': {
      position: 'relative',
      top: '-1px',
      left: '1px'
    }
  }
}));

// Check if one ingredient is missing
const checkMissingIngredient = (ingredient, availableItems) => {
  return !availableItems.includes(ingredient);
}

// Check if item is in cart 
// Note: like checkMissingInCartRecipe, doesn't matter if its true if it's not missing from available items
const checkMissingIngredientInCart = (ingredient, cart) => {
  return cart.includes(ingredient);
}

interface Props {
  recipe?;
  ingredient?;
  availableItems;
  cart;
  style?;
}

// Shows tag if either
// 1) Some/all ingredients missing (red icon)
// 2) Missing ingredients are in cart (yellow icon)
// 3) All ingredients present (green icon)
const ItemTag = ({ recipe, ingredient, availableItems, cart, style }: Props) => {
  const classes = useStyles();

  // Determine if getting tag for a whole recipe or just one ingredient
  const isRecipe = Boolean(recipe);

  const hasMissingItems = isRecipe ?
    checkMissingItemsRecipe(recipe, availableItems) :
    checkMissingIngredient(ingredient, availableItems)
  const hasMissingInCart = isRecipe ?
    checkMissingInCartRecipe(recipe, availableItems, cart) :
    checkMissingIngredientInCart(ingredient, cart);

  if (hasMissingItems && !hasMissingInCart) {
    return (
      <Tooltip title={`Ingredient${isRecipe ? 's' : ''} Not Available`}>
        <div className={classes.container} style={{ ...style, borderColor: 'rgb(255, 89, 100)' }}>
          <RemoveBagIconSmallFill />
        </div>
      </Tooltip>
    )
  }
  else if (hasMissingItems && hasMissingInCart) {
    return (
      <Tooltip title={`Ingredient${isRecipe ? 's' : ''} in Cart`}>
        <div className={classes.container} style={{ ...style, borderColor: 'rgb(255, 231, 76)' }}>
          <WarningCartIconSmallFill />
        </div>
      </Tooltip>
    )
  }
  return (
    <Tooltip title={`${isRecipe ? 'All ' : ''}Ingredient${isRecipe ? 's' : ''} Available`}>
      <div className={classes.container} style={{ ...style, borderColor: '#AEF78E' }}>
        <CheckBagIconSmallFill />
      </div>
    </Tooltip>
  )
}

export default ItemTag;