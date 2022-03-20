import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
// Icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
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
import {
  AddCartIconSmall,
  AddCartIconSmallWhite 
} from '@core/components/Icons/CartIcon';
// Utils
import checkMissingItemsRecipe from 'recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from 'recipes/utils/checkMissingInCartRecipe';
// Types
import { Recipe, Ingredient, AlternativeIngredient } from 'recipes/types';
import { ClickEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    position: 'relative',
    borderStyle: 'solid', 
    borderWidth: '2px', 
    borderRadius: '50%',
    alignSelf: 'center',
    cursor: 'pointer',
    '& svg': {
      position: 'relative',
      top: '-1px',
      left: '1px'
    }
  },
  optionalIcon: {
    position: 'absolute',
    top: '-0.9em',
    right: '-0.9em',
    '& svg': {
      height: '0.8em',
      width: '0.8em'
    }
  }
}));

// Check if even one ingredient is missing
const checkMissingIngredient = (ingredient: string, inventory: string[]) => {
  return !inventory.includes(ingredient);
}

// Check if item is in cart 
// Note: like checkMissingInCartRecipe, doesn't matter if its true if it's not missing from available items
const checkMissingIngredientInCart = (ingredient: string, cart: string[]) => {
  return cart.includes(ingredient);
}

interface Props {
  inventory: string[];
  cart: string[];
  recipe?: Recipe;
  ingredient?: Ingredient | AlternativeIngredient;
  onAddMissing: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
  isMobile?: boolean;
}

// Shows tag if either
// 1) Some/all ingredients missing (red icon)
// 2) All missing ingredients are in cart (yellow icon)
// 3) All ingredients available (green icon)
const ItemTag: React.FC<Props> = ({ 
  inventory, 
  cart, 
  recipe, 
  ingredient,
  onAddMissing,
  style, 
  isMobile 
}) => {
  const classes = useStyles();

  const [isHover, setHover] = React.useState(false);

  // Determine if getting tag for a whole recipe or just one ingredient
  const isRecipe = Boolean(recipe);

  const hasMissingItems = isRecipe ?
    checkMissingItemsRecipe(recipe, inventory) :
    checkMissingIngredient(ingredient.itemId, inventory)
  const hasMissingInCart = isRecipe ?
    checkMissingInCartRecipe(recipe, inventory, cart) :
    checkMissingIngredientInCart(ingredient.itemId, cart);
  const isOptional = !isRecipe && ingredient.isOptional;

  const handleHoverOn = () => {
    if (!isHover && hasMissingItems && !hasMissingInCart) 
      setHover(true)
  }
  const handleHoverOut = () => {
    if (isHover && hasMissingItems && !hasMissingInCart) 
      setHover(false)
  }
  const handleClick = (event: ClickEvent) => {
    event.stopPropagation();
    setHover(false); // Visual bug occurs if request done while cursor still inside
    onAddMissing();
  }

  // Default to no missing items
  let tooltipTitle = 'Add To Cart';
  let borderColor = isHover ? (
    isRecipe ? '#fff' : '#3f51b5'
  ) : '#AEF78E';
  let ItemIcon = () => isMobile ? <CheckBagIconLargeFill /> : <CheckBagIconSmallFill />;

  if (hasMissingItems && !hasMissingInCart && !isHover) {
    tooltipTitle = `Ingredient${isRecipe ? 's' : ''} Not Available`;
    borderColor = 'rgb(255, 89, 100)';
    // eslint-disable-next-line react/display-name
    ItemIcon = () => isMobile ? <RemoveBagIconLargeFill /> : <RemoveBagIconSmallFill />;
  }
  else if (hasMissingItems && hasMissingInCart && !isHover) {
    tooltipTitle = `Ingredient${isRecipe ? 's' : ''} in Cart`;
    borderColor = 'rgb(255, 231, 76)';
    // eslint-disable-next-line react/display-name
    ItemIcon = () => isMobile ? <WarningCartIconLargeFill /> : <WarningCartIconSmallFill />;
  }

  const defaultStyles = {
    height: isMobile ? '6.62em' : '2.6em',
    borderWidth: isMobile ? '5px' : '2px',
    padding: isMobile ? '1em' : '0.4em',
    borderColor
  }

  return (
    <Tooltip title={tooltipTitle}>
      <div 
        className={classes.container} 
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOut}
        style={{ 
          ...defaultStyles,
          ...style
        }}
      >
        {isOptional ? (
          <div className={classes.optionalIcon}>
            <HelpOutlineIcon style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
          </div>
        ) : null}
        {hasMissingItems && !hasMissingInCart ? (
          <div onClick={handleClick}>
            {isHover ? (
              isRecipe ? <AddCartIconSmallWhite /> : <AddCartIconSmall />
            ) : (
              <ItemIcon />
            )}
          </div>
        ) : (
          <ItemIcon />
        )}
      </div>
    </Tooltip>
  )
}

export default ItemTag;