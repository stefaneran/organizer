import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Divider, Button } from '@material-ui/core';
import { AddCartIconLarge } from '@core/components/Icons/CartIcon';
import Ingredients from '@recipes/components/Ingredients';
import checkMissingItemsRecipe from '@recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from '@recipes/utils/checkMissingInCartRecipe';
import { InventoryItem } from '@inventory/types';
import { Recipe } from '@recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  detailsContainer: {
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: '0.5em'
  },
  instructions: {
    marginTop: '1.5em',
    marginBottom: '1.5em',
    whiteSpace: 'pre-line',
    fontSize: '2em'
  },
  ingredientsContainer: {
    marginTop: '1.5em'
  },
  buttonContainer: {
    marginTop: '2.5em',
    marginBottom: '2.5em',
    textAlign: 'center'
  },
  button: {
    fontSize: '4em'
  }
}));

interface Props {
  recipe: Recipe;
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  cart: string[];
  addToCart: (itemIds: string[]) => void;
  onAddMissing: () => void;
}

const RecipeDetails: React.FC<Props> = ({ 
  recipe, 
  allItems, 
  availableItems, 
  cart, 
  addToCart,
  onAddMissing
}) => {
  const classes = useStyles();

  const hasRecipe = Boolean(recipe);
  const hasMissingItems = recipe && checkMissingItemsRecipe(recipe, availableItems);
  const hasMissingInCart = recipe && checkMissingInCartRecipe(recipe, availableItems, cart);

  return (
    <>
    {hasRecipe && (
      <div className={classes.detailsContainer}>
        <div className={classes.header}>
          <div>
            <Typography variant="h1">
              {recipe.name}
            </Typography>
            <Typography variant="h2" className={classes.subtitle}>
              {`${recipe.nationality} - ${recipe.category}`}
            </Typography>
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
            addToCart={addToCart}
            isMobile={true}
          />
        </div>
        {hasMissingItems && !hasMissingInCart && (
          <>
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                endIcon={<AddCartIconLarge />}
                onClick={onAddMissing}
              >
                Add Missing
              </Button>
            </div>
          </>
        )}
      </div>
    )}
    </>
  )
}

export default RecipeDetails;