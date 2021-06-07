import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip, Tooltip } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chip: {
    marginRight: '0.5em',
    background: '#FFB60A',
    color: '#fff',
    '& svg': {
      color: '#fff'
    }
  }
}));

interface Props {
  oneOnOne: boolean;
  style?;
}

const OneOnOneChip = ({ oneOnOne, style }: Props) => {
  const classes = useStyles();
  const label = oneOnOne ? "One On One" : "Group Only";
  const icon = oneOnOne ? <PersonIcon /> : <PeopleAltIcon />
  return (
    <Tooltip title="Can interact with one-on-one or only in a group">
      <Chip 
        icon={icon}
        className={classes.chip}
        label={label}
        style={{ ...style }}
      />
    </Tooltip>
  )
}

export default OneOnOneChip;