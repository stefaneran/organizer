import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    textAlign: 'left',
    marginTop: '1em'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

interface Props {
  memo: () => any[]; // useMemo function that returns collection
  deps: any[]; // Dependencies for the useMemo
  getKey: (chip: any) => string;
  getLabel: (chip: any) => string;
}

const Chips = ({ memo, deps, getKey, getLabel }: Props) => {
  const classes = useStyles();

  const chips = React.useMemo(() => memo(), [...deps])

  return (
    <div className={classes.container}>
      <>
        {chips.map(chip => (
          <Chip 
            className={classes.chip}
            key={getKey(chip)} 
            label={getLabel(chip)}
            color="primary"
          />
        ))}
      </>
    </div>
  )
}

export default Chips;