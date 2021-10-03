import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  container: {
    textAlign: 'left'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChipType = any;

interface Props {
  // useMemo function that returns collection
  memo: () => ChipType[]; 
  // Dependencies for the useMemo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[]; 
  getKey: (chip: ChipType) => string;
  getLabel: (chip: ChipType) => string;
}

const Chips: React.FC<Props> = ({ 
  memo, 
  deps, 
  getKey, 
  getLabel 
}) => {
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