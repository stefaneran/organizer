import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { MaleIconChip, FemaleIconChip } from '@core/components/Icons/GenderIcon';
import { Genders } from '@contacts/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chip: {
    marginRight: '0.5em',
    color: '#fff',
    '& svg': {
      position: 'relative',
      top: '-0.1em',
      left: '0.5em'
    }
  }
}));

interface Props {
  gender: Genders;
  style?: Record<string, string | number>;
}

const GenderChip: React.FC<Props> = ({ gender, style }) => {
  const classes = useStyles();
  const isMale = gender === Genders.Male;
  const genderStyle = { backgroundColor: isMale ? '#73A6D4' : '#FF69B3' }
  return (
    <Chip 
      icon={isMale ? <MaleIconChip /> : <FemaleIconChip />}
      className={classes.chip}
      label={gender}
      style={{ ...style, ...genderStyle }}
    />
  )
}

export default GenderChip;