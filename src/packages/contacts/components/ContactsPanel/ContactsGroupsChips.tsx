import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    textAlign: 'left',
    paddingTop: '0.5em'
  },
  chip: {
    cursor: 'pointer',
    marginRight: '0.5em',
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff'
    }
  }
}));

interface Props {
  groups: string[];
  selectedGroup: string;
  onSelect: (filter: string) => (value: string) => void;
}

const ContactInfoGroupsChips: React.FC<Props> = ({ 
  groups, 
  selectedGroup, 
  onSelect 
}) => {
  const classes = useStyles();

  const isSelected = (group: string) => selectedGroup === group;

  const handleSelect = (group: string) => () => onSelect('group')(group);

  return (
    <div className={classes.container}>
      <Chip 
        label="All"
        className={!isSelected("All") ? classes.chip : ''}
        color={isSelected("All") ? "primary" : undefined}
        onClick={handleSelect("All")}
      />
      {groups.length ? groups.map(group => (
        <Chip 
          key={group} 
          label={group}
          className={!isSelected(group) ? classes.chip : ''}
          color={isSelected(group) ? "primary" : undefined}
          onClick={handleSelect(group)}
        />
      )) : null}
    </div>
  )
}

export default ContactInfoGroupsChips;