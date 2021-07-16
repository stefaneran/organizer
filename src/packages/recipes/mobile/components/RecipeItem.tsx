import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ItemTag from 'recipes/components/ItemTag';
import { Recipe } from 'recipes/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '0.7em',
    position: 'relative',
    marginBottom: '1em',
    cursor: 'pointer',
    boxShadow: '5px 4px 4px 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& .subtitle': {
      color: 'rgba(0, 0, 0, 0.54)',
    }
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
  availableItems: string[];
  cart: string[];
  onSelectRecipe: (id: string) => () => void;
  onAddMissing: () => void;
}

const RecipeItem: React.FC<Props> = ({ 
  recipeId, 
  recipe,
  availableItems,
  cart,
  onSelectRecipe,
  onAddMissing
}) => {

  const classes = useStyles();

  return (
    <Paper 
      onClick={onSelectRecipe(recipeId)}
      className={classes.container}
    >
      <ItemTag 
        recipe={recipe} 
        availableItems={availableItems} 
        cart={cart} 
        onAddMissing={onAddMissing}
        style={{ marginRight: '1.5em' }}
        isMobile
      />
      <div className={classes.textContainer}>
        <Typography variant="h2">
          {recipe.name}
        </Typography>
        <Typography variant="h3" className={'subtitle'}>
          {`${recipe.nationality} - ${recipe.category}`}
        </Typography>
      </div>
    </Paper>
  )
}

export default RecipeItem;