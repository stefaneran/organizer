import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { AddCartIconXS } from '@core/components/Icons/CartIcon';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import Ingredients from '@recipes/components/Ingredients';
import checkMissingItemsRecipe from '@recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from '@recipes/utils/checkMissingInCartRecipe';
import { InventoryItem } from '@inventory/types';
import { Recipe, EditMode } from '@recipes/types';
import { ClickEvent } from '@core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  detailsContainer: {
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerTitles: {
    maxWidth: '75%'
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1.5em',
    marginBottom: '1.5em'
  },
  instructions: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
    whiteSpace: 'pre-line'
  },
  ingredientsContainer: {
    marginTop: '1.5em'
  },
  buttonContainer: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
    textAlign: 'center'
  }
}));

interface Props {
  recipe: Recipe; 
  allItems: Record<string, InventoryItem>; 
  availableItems: string[]; 
  cart: string[]; 
  addToCart: (itemIds: string[]) => void;
  onOpenEditRecipe: (mode: EditMode) => () => void;
  onSelectRecipe: (id: string) => () => void;
  onDeleteRecipe: () => void;
  onAddMissing: (ingredientName: string) => (event: ClickEvent) => void;
}

const RecipeInfo: React.FC<Props> = ({ 
  recipe, 
  allItems, 
  availableItems, 
  cart, 
  addToCart,
  onOpenEditRecipe,
  onSelectRecipe,
  onDeleteRecipe,
  onAddMissing
}) => {
  const classes = useStyles();

  const hasRecipe = Boolean(recipe);
  const hasMissingItems = recipe && checkMissingItemsRecipe(recipe, availableItems);
  const hasMissingInCart = recipe && checkMissingInCartRecipe(recipe, availableItems, cart);

  const handleAddMissingToCart = () => {
    const missing: string[] = [];
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
    <>
    {hasRecipe && (
      <div className={classes.detailsContainer}>
        <div className={classes.header}>
          <div className={classes.headerTitles}>
            <Typography variant="h4">
              {recipe.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              {`${recipe.nationality} - ${recipe.category}`}
            </Typography>
          </div>
          <div>
            <Tooltip title="Edit Recipe Details">
              <IconButton onClick={onOpenEditRecipe('edit')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close Details">
              <IconButton onClick={onSelectRecipe('')}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Divider />
        <Typography variant="body1" className={classes.instructions}>
          {recipe.instructions}
        </Typography>
        <Divider />
        <div className={classes.ingredientsContainer}>
          <Ingredients 
            ingredients={recipe.ingredients}
            allItems={allItems}
            availableItems={availableItems}
            cart={cart}
            onAddMissing={onAddMissing}
          />
        </div>
        {hasMissingItems && !hasMissingInCart && (
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<AddCartIconXS />}
              onClick={handleAddMissingToCart}
            >
              Add Missing
            </Button>
          </div>
        )}
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<TrashIconXS />}
            onClick={onDeleteRecipe}
          >
            Delete
          </Button>
        </div>
      </div>
    )}
    </>
  )
}

export default RecipeInfo;