import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex'
  },
  chipContainer: {
    marginRight: '1em'
  },
  chip: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff'
    }
  }
}));

const getNationalities = (recipes) => 
  Object.keys(recipes).map(recipeId => recipes[recipeId].nationality)

const Nationalities = ({ recipes, selectedNationality, onSelectNationality }) => {
  const classes = useStyles();
  const nationalities = getNationalities(recipes);
  const isSelected = (nationality) => selectedNationality === nationality;
  return (
    <div className={classes.container}>
      <div className={classes.chipContainer}>
        <Chip 
          label="All" 
          className={!isSelected('All') && classes.chip}
          color={isSelected('All') ? "primary" : undefined}
          onClick={onSelectNationality('All')} 
        />
      </div>
      {nationalities.map(nationality => (
        <div key={nationality} className={classes.chipContainer}>
          <Chip 
            key={nationality} 
            label={nationality}
            className={!isSelected(nationality) && classes.chip} 
            color={isSelected(nationality) ? "primary" : undefined}
            onClick={onSelectNationality(nationality)} 
          />
        </div>
      ))}
    </div>
  )
}

export default Nationalities;