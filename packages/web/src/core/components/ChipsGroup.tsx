import * as React from 'react';
import clsx from 'clsx';
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
    '&.selected': {
      color: '#fff'
    },
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff'
    }
  }
}));

interface Props {
  options: string[];
  selectedOption: string; 
  onSelect?: (option: string) => void;
  allBlue?: boolean;
}

const ChipsGroup: React.FC<Props> = ({ 
  options, 
  selectedOption, 
  onSelect,
  allBlue
}) => {
  const classes = useStyles();

  const isSelected = (option: string) => allBlue ? true : selectedOption === option;

  const handleSelect = (option: string) => () => onSelect(option);

  return (
    <div className={classes.container}>
      {options.map(option => (
        <Chip 
          key={option} 
          label={option}
          className={clsx(classes.chip, isSelected(option) && 'selected')} 
          color={isSelected(option) ? "primary" : undefined}
          onClick={handleSelect(option)} 
        />
      ))}
    </div>
  )
}

export default ChipsGroup;