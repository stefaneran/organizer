import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    maxWidth: '60%',
    flexWrap: 'wrap',
    paddingTop: '0.5em'
  },
  chip: {
    cursor: 'pointer',
    marginRight: '0.5em',
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff'
    }
  }
}));

interface Props {
  nationalityOptions: string[];
  selectedNationality: string; 
  onSelectNationality: (nationality: string) => void;
}

const NationalitiesChips: React.FC<Props> = ({ 
  nationalityOptions, 
  selectedNationality, 
  onSelectNationality 
}) => {
  const classes = useStyles();

  const isSelected = (nationality: string) => selectedNationality === nationality;

  const handleSelect = (nationality: string) => () => onSelectNationality(nationality);

  return (
    <div className={classes.container}>
      <Chip 
        label="All" 
        className={!isSelected('All') ? classes.chip : ''}
        color={isSelected('All') ? "primary" : undefined}
        onClick={handleSelect('All')} 
      />
      {nationalityOptions.map(nationality => (
        <Chip 
          key={nationality} 
          label={nationality}
          className={!isSelected(nationality) ? classes.chip : ''} 
          color={isSelected(nationality) ? "primary" : undefined}
          onClick={handleSelect(nationality)} 
        />
      ))}
    </div>
  )
}

export default NationalitiesChips;