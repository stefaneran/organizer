import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { AddCartIconXS } from '@core/components/Icons/CartIcon';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
// Components
import { Typography, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import Ingredients from 'recipes/components/Ingredients';
// Utils
import checkMissingItemsRecipe from 'recipes/utils/checkMissingItemsRecipe';
import checkMissingInCartRecipe from 'recipes/utils/checkMissingInCartRecipe';
// Types
import { RootState } from '@core/types';
import { Recipe, EditMode } from 'recipes/types';

const useStyles = makeStyles(() => createStyles({
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
  onAddMissing: () => void;
  onOpenEditRecipe: (mode: EditMode) => () => void;
  onSelectRecipe: (id: string) => () => void;
  onDeleteRecipe: () => void;
}

const RecipeInfo: React.FC<Props> = ({ 
  recipe,
  onAddMissing,
  onOpenEditRecipe,
  onSelectRecipe,
  onDeleteRecipe
}) => {
  const classes = useStyles();
  const { inventory, cart } = useSelector((state: RootState) => state.inventoryStore); 

  const hasRecipe = Boolean(recipe);
  const hasMissingItems = recipe && checkMissingItemsRecipe(recipe, inventory);
  const hasMissingInCart = recipe && checkMissingInCartRecipe(recipe, inventory, cart);

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
          <Ingredients ingredients={recipe.ingredients} />
        </div>
        {hasMissingItems && !hasMissingInCart && (
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<AddCartIconXS />}
              onClick={onAddMissing}
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