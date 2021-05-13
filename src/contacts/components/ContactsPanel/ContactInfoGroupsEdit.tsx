import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextMultiSelect from '@core/components/TextMultiSelect';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '0 1em 1em 1em',
    textAlign: 'left'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

const ContactInfoGroups = ({ 
  groups, 
  contactGroups,
  onChange 
}) => {
  const classes = useStyles();

  const handleChange = (value) => {
    onChange('groups')(value.map(v => v.label));
  }

  return (
    <div className={classes.container}>
      <TextMultiSelect
        label="Groups"
        onChange={handleChange}
        defaultValue={contactGroups ? contactGroups.map(group => ({ label: group, value: group })) : []}
        options={groups.map(group => ({ label: group, value: group }))}
        canAdd
        helperText="Groups this contact belongs to. Hint: Press enter to add new non-existant group."
        size="small"
      />
    </div>
  )
}

export default ContactInfoGroups;