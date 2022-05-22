import * as React from 'react';
// Icons
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
// Constants
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR, BLUE_COLOR } from '@core/constants/colors';

const getIngredientAvailabilityIcon = (ingredient, inventory, cart, isHover, isMobile) => {

  const hasMissingItems = !inventory.includes(ingredient.itemId);
  const hasMissingInCart = cart.includes(ingredient.itemId);

  // Default to no missing items
  let tooltipTitle = 'Add To Cart';
  let borderColor = isHover ? BLUE_COLOR : GREEN_COLOR;
  let ItemIcon = () => isMobile ? <CheckBagIconLargeFill /> : <CheckBagIconSmallFill />;

  if (hasMissingItems && !hasMissingInCart && !isHover) {
    tooltipTitle = `Ingredient Not Available`;
    borderColor = RED_COLOR;
    // eslint-disable-next-line react/display-name
    ItemIcon = () => isMobile ? <RemoveBagIconLargeFill /> : <RemoveBagIconSmallFill />;
  }
  else if (hasMissingItems && hasMissingInCart && !isHover) {
    tooltipTitle = `Ingredient in Cart`;
    borderColor = YELLOW_COLOR;
    // eslint-disable-next-line react/display-name
    ItemIcon = () => isMobile ? <WarningCartIconLargeFill /> : <WarningCartIconSmallFill />;
  }

  return {
    hasMissingItems,
    hasMissingInCart,
    ItemIcon,
    tooltipTitle,
    borderColor
  }

}

export default getIngredientAvailabilityIcon;