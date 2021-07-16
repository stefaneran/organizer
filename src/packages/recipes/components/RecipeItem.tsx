import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ItemTag from 'recipes/components/ItemTag';
import { Recipe } from 'recipes/types';
import { ClickEvent } from 'core/types';

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
      background: 'rgba(63, 81, 181, 0.85)',
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

interface Props {
  recipeId: string; 
  recipe: Recipe;
  selectedRecipe: string; 
  availableItems: string[];
  cart: string[];
  onSelectRecipe: (id: string) => () => void;
  onAddMissing: () => void;
}

const RecipeItem: React.FC<Props> = ({ 
  recipeId, 
  recipe, 
  selectedRecipe, 
  availableItems,
  cart,
  onSelectRecipe,
  onAddMissing
}) => {

  const classes = useStyles();
  const isSelected = selectedRecipe === recipeId;

  return (
    <Paper 
      onClick={onSelectRecipe(recipeId)}
      className={isSelected ? clsx(classes.container, classes.selected) : classes.container}
    >
      <ItemTag 
        recipe={recipe} 
        availableItems={availableItems} 
        cart={cart} 
        onAddMissing={onAddMissing}
      />
      <div className={classes.textContainer}>
        <Typography variant="h6">
          {recipe.name}
        </Typography>
        <Typography variant="subtitle2" className="subtitle">
          {`${recipe.nationality} - ${recipe.category}`}
        </Typography>
      </div>
    </Paper>
  )
}

export default RecipeItem;