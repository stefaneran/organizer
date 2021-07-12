import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { MaleIconChip, FemaleIconChip } from '@core/components/Icons/GenderIcon';
import { Genders } from '@contacts/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chip: {
    color: '#fff',
    '& svg': {
      position: 'relative',
      top: '-0.1em',
      left: '0.5em'
    }
  },
  miniChip: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    padding: '0.25em',
    '& svg': {
      color: '#fff',
      width: '1.5rem',
      height: '1.5rem'
    }
  }
}));

interface Props {
  gender: Genders;
  mini?: boolean;
  style?: Record<string, string | number>;
}

const GenderChip: React.FC<Props> = ({ gender, mini, style }) => {
  const classes = useStyles();
  const isMale = gender === Genders.Male;
  const genderStyle = { 
    backgroundColor: isMale ? '#73A6D4' : '#FF69B3',
    marginRight: '0.5em'
  }
  return (
    <>
    {mini ? (
      <div 
        className={classes.miniChip} 
        style={{ ...style, ...genderStyle }}
      >
        {isMale ? <MaleIconChip /> : <FemaleIconChip />}
      </div>
    ) : (
      <Chip 
        icon={isMale ? <MaleIconChip /> : <FemaleIconChip />}
        className={classes.chip}
        label={gender}
        style={{ ...style, ...genderStyle }}
      />
    )}
    
    </>
  )
}

export default GenderChip;