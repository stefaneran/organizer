import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { AddCartIconSmall, AddCartIconSmallWhite } from '@core/components/Icons/CartIcon';
// Components
import { Tooltip } from '@material-ui/core';
// Utils
import getRecipeAvailabilityIcon from 'recipes/utils/getRecipeAvailabilityIcon';
import getIngredientAvailabilityIcon from 'recipes/utils/getIngredientAvailabilityIcon';
// Types
import { Recipe, Ingredient, AlternativeIngredient } from 'recipes/types';
import { ClickEvent, RootState } from '@core/types';

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

interface Props {
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
  recipe,
  ingredient,
  onAddMissing,
  style,
  isMobile
}) => {
  const classes = useStyles();
  const { inventory, cart } = useSelector((state: RootState) => state.inventoryStore);

  const [isHover, setHover] = React.useState(false);

  // Determine if getting tag for a whole recipe or just one ingredient
  const isRecipe = Boolean(recipe);

  const {
    hasMissingItems,
    hasMissingInCart,
    ItemIcon,
    tooltipTitle,
    borderColor
  } = isRecipe ?
      getRecipeAvailabilityIcon(recipe, inventory, cart, isHover, isMobile) :
      getIngredientAvailabilityIcon(ingredient, inventory, cart, isHover, isMobile);

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