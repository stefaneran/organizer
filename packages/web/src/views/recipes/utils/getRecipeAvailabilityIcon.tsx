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
// Utils
import checkMissingItemsRecipe from 'recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from 'recipes/utils/checkMissingInCartRecipe';
// Constants
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from '@core/constants/colors';

const getRecipeAvailabilityIcon = (recipe, inventory, cart, isHover, isMobile) => {

  const hasMissingItems = checkMissingItemsRecipe(recipe, inventory)
  const hasMissingInCart = checkMissingInCartRecipe(recipe, inventory, cart);

  // Default to no missing items
  let tooltipTitle = 'Add To Cart';
  let borderColor = isHover ? '#fff' : GREEN_COLOR;
  let ItemIcon = () => isMobile ? <CheckBagIconLargeFill /> : <CheckBagIconSmallFill />;

  if (hasMissingItems && !hasMissingInCart && !isHover) {
    tooltipTitle = `Ingredients Not Available`;
    borderColor = RED_COLOR;
    // eslint-disable-next-line react/display-name
    ItemIcon = () => isMobile ? <RemoveBagIconLargeFill /> : <RemoveBagIconSmallFill />;
  }
  else if (hasMissingItems && hasMissingInCart && !isHover) {
    tooltipTitle = `Ingredients in Cart`;
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

export default getRecipeAvailabilityIcon;