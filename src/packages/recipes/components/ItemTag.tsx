import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { 
  RemoveBagIconSmallFill, 
  RemoveBagIconLargeFill,
  CheckBagIconSmallFill,
  CheckBagIconLargeFill
} from '@core/components/Icons/BagIcon';
import { 
  WarningCartIconSmallFill, 
  WarningCartIconLargeFill 
} from '@core/components/Icons/CartIcon';
import checkMissingItemsRecipe from '@recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from '@recipes/utils/checkMissingInCartRecipe';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    borderStyle: 'solid', 
    borderWidth: '2px', 
    borderRadius: '50%',
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
  isMobile?: boolean;
}

// Shows tag if either
// 1) Some/all ingredients missing (red icon)
// 2) Missing ingredients are in cart (yellow icon)
// 3) All ingredients present (green icon)
const ItemTag = ({ recipe, ingredient, availableItems, cart, style, isMobile }: Props) => {
  const classes = useStyles();

  // Determine if getting tag for a whole recipe or just one ingredient
  const isRecipe = Boolean(recipe);

  const hasMissingItems = isRecipe ?
    checkMissingItemsRecipe(recipe, availableItems) :
    checkMissingIngredient(ingredient, availableItems)
  const hasMissingInCart = isRecipe ?
    checkMissingInCartRecipe(recipe, availableItems, cart) :
    checkMissingIngredientInCart(ingredient, cart);

  const defaultStyles = {
    height: isMobile ? '6.62em' : '2.6em',
    borderWidth: isMobile ? '5px' : '2px',
    padding: isMobile ? '1em' : '0.4em',
  }

  if (hasMissingItems && !hasMissingInCart) {
    return (
      <Tooltip title={`Ingredient${isRecipe ? 's' : ''} Not Available`}>
        <div 
          className={classes.container} 
          style={{ 
            ...defaultStyles,
            ...style,
            borderColor: 'rgb(255, 89, 100)'
          }}
        >
          {isMobile ? <RemoveBagIconLargeFill /> : <RemoveBagIconSmallFill />}
        </div>
      </Tooltip>
    )
  }
  else if (hasMissingItems && hasMissingInCart) {
    return (
      <Tooltip title={`Ingredient${isRecipe ? 's' : ''} in Cart`}>
        <div 
          className={classes.container} 
          style={{ 
            ...defaultStyles,
            ...style,
            borderColor: 'rgb(255, 231, 76)' 
          }}
        >
          {isMobile ? <WarningCartIconLargeFill /> : <WarningCartIconSmallFill />}
        </div>
      </Tooltip>
    )
  }
  return (
    <Tooltip title={`${isRecipe ? 'All ' : ''}Ingredient${isRecipe ? 's' : ''} Available`}>
      <div 
        className={classes.container} 
        style={{ 
          ...defaultStyles,
          ...style, 
          borderColor: '#AEF78E'
        }}
      >
        {isMobile ? <CheckBagIconLargeFill /> : <CheckBagIconSmallFill />}
      </div>
    </Tooltip>
  )
}

export default ItemTag;