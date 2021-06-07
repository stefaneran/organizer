import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    maxWidth: '60%',
    flexWrap: 'wrap'
  },
  chipContainer: {
    marginRight: '1em',
    marginBottom: '1em'
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

const Nationalities = ({ nationalityOptions, selectedNationality, onSelectNationality }) => {
  const classes = useStyles();

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
      {nationalityOptions.map(nationality => (
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